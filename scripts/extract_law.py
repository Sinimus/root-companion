"""Build src/data/law_full.ts from the official Law of Root PDF.

usage: uv run --with pymupdf python scripts/extract_law.py <Root_Base_Law_Oct_2025.pdf>

The PDF is set in two columns with hanging indents. Text blocks are read in
column order, joined into logical lines and split into rules:
  "8.4 Birdsong"                     subsection (its body text becomes rule 8.4)
  "8.4.1 Revolt. Any number ..."     rule
  "I Step 1: Choose Clearing. ..."   sub-rule 8.4.1.I
  "a Martial Law. You must ..."      sub-rule 8.4.2.IIa
Item and faction icons are set in a symbol font that extracts as single
letters; item letters are spelled out, faction icon runs are dropped.
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path

import pymupdf

OUTPUT = Path(__file__).resolve().parent.parent / "src" / "data" / "law_full.ts"
EDITION = "October 13, 2025"

CHAPTERS = [
    "1. Golden Rules", "2. Key Concepts", "3. Victory", "4. Key Actions", "5. Setup",
    "6. Marquise de Cat", "7. Eyrie Dynasties", "8. Woodland Alliance", "9. Vagabond",
    "10. Lizard Cult", "11. Riverfolk Company", "12. Underground Duchy",
    "13. Corvid Conspiracy", "14. Lord of the Hundreds", "15. Keepers in Iron",
    "16. Lilypad Diaspora", "17. Twilight Council", "18. Knaves of the Deepwood",
    "A. Advanced Setup", "C. Components", "G. Glossary", "H. Hirelings",
    "K. Knave Captains", "L. Landmarks", "M. Maps", "V. Vagabonds",
]
FIRST_PAGE = 2  # page 1 is the table of contents
LAST_PAGE = 29  # the index starts on page 30

ITEM_LETTERS = {
    "M": "boot", "S": "sword", "F": "torch", "C": "crossbow",
    "H": "hammer", "T": "tea", "X": "coins", "B": "bag",
}
# Chapters whose text uses item icons
ITEM_CHAPTERS = ("5.1.5", "9.", "14.", "18.", "G.13", "K.", "V.")
HIRELING_ICONS = {
    "H.2.1": "card with a check mark", "H.2.2": "trees",
    "H.2.3": "rising sun", "H.2.4": "sun",
}
ROMANS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]

SOFT_HYPHEN = "­"
JOIN = "\u0001"  # marks a line that ended in a hyphenated word break
RULE_ID = r"(?:\d{1,2}|[ACGHKLMV])(?:\.\d{1,2}){1,2}"
RULE_LINE = re.compile(rf"^({RULE_ID}) (.+)$")
ROMAN_LINE = re.compile(r"^(I|II|III|IV|V|VI|VII|VIII|IX) ([A-Z].*)$")
LETTER_LINE = re.compile(r"^([a-h]) ([A-Z].*)$")
FACTION_ICONS = re.compile(r"(?<=[.)”]) [A-Za-z]{1,5}$")
ITEM_TOKEN = re.compile(r"(?<![“\w.])([MSFCHTXB])(?![”\w]|\.\d)")
NOTE_LINE = re.compile(r"^The next (two|three) sections refer to factions")


@dataclass
class Rule:
    id: str
    title: str
    text: str
    section: str
    subsection: str


def clean(raw: str) -> str:
    """One paragraph per block. A trailing word break is kept as JOIN."""
    text = raw.replace(" ", " ").replace("ﬀ", "ff").replace("ﬁ", "fi").replace("ﬂ", "fl")
    text = text.replace("", "Th").rstrip()
    broken = text.endswith(SOFT_HYPHEN) or re.search(r"[a-z]-$", text) is not None
    text = re.sub(rf"(?:{SOFT_HYPHEN}|(?<=[a-z])-)\s*\n\s*", "", text).replace(SOFT_HYPHEN, "")
    text = re.sub(r"\s+", " ", text).strip()
    if broken:
        text = text.rstrip("-") + JOIN
    return text


def read_lines(pdf: Path) -> list[str]:
    doc = pymupdf.open(pdf)
    lines: list[str] = []
    for number, page in enumerate(doc, 1):
        if number < FIRST_PAGE or number > LAST_PAGE:
            continue
        width = page.rect.width
        blocks = [b for b in page.get_text("blocks") if b[6] == 0]

        def column(block: tuple) -> int:
            if block[2] - block[0] > 0.6 * width:
                return 0
            return 0 if (block[0] + block[2]) / 2 < width / 2 else 1

        for block in sorted(blocks, key=lambda b: (column(b), b[1], b[0])):
            text = clean(block[4])
            if len(re.sub(r"[^A-Za-z]", "", text)) >= 3 or ROMAN_LINE.match(text + " X"):
                lines.append(text)
    return lines


def split_chapters(lines: list[str]) -> list[str]:
    """Chapter headings often sit at the end of the previous paragraph."""
    out: list[str] = []
    for line in lines:
        for chapter in CHAPTERS:
            match = re.search(rf"(^|(?<= )){re.escape(chapter)}( [A-Za-z])?$", line)
            if match:
                before = line[: match.start()].strip()
                if before:
                    out.append(before)
                out.append(chapter)
                break
        else:
            out.append(line)
    return out


def join(a: str, b: str) -> str:
    if a.endswith(JOIN):
        return a[:-1] + b
    return f"{a} {b}" if a else b


def split_title(rest: str) -> tuple[str, str]:
    match = re.match(r"^(.*?[^.])\. (.+)$", rest)
    if match:
        return match.group(1), match.group(2)
    return rest.rstrip("."), ""


def parse(lines: list[str]) -> list[Rule]:
    rules: list[Rule] = []
    section = ""
    subsection = ""
    parent = ""  # id of the rule that roman sub-rules hang from
    roman_parent = ""  # id of the roman sub-rule that letters hang from
    started = False

    def add(rule_id: str, title: str, text: str) -> None:
        rules.append(Rule(rule_id, title, text, section, subsection))

    for line in lines:
        if line in CHAPTERS:
            started = True
            section, subsection, parent, roman_parent = line, "", "", ""
            continue
        if not started or NOTE_LINE.match(line) or line.startswith(("in The ", "The Underworld Expansion", "The Marauder Expansion", "The Homeland Expansion", "The Riverfolk Expansion")):
            continue

        match = RULE_LINE.match(line)
        if match and match.group(1).split(".")[0] == section.split(".")[0]:
            rule_id, rest = match.groups()
            title, text = split_title(rest)
            if rule_id.count(".") == 1 and not text:
                # Subsection heading; its body, if any, follows on later lines
                subsection = f"{rule_id} {title}"
                add(rule_id, title, "")
            else:
                if rule_id.count(".") == 1:
                    subsection = ""
                add(rule_id, title, text)
            parent, roman_parent = rule_id, ""
            continue

        match = ROMAN_LINE.match(line.rstrip(JOIN))
        if match and parent and rules:
            expected = [r.id for r in rules if r.id.startswith(parent + ".") and r.id[len(parent) + 1:] in ROMANS]
            if match.group(1) == ROMANS[len(expected)]:
                title, text = split_title(match.group(2) + (JOIN if line.endswith(JOIN) else ""))
                roman_parent = f"{parent}.{match.group(1)}"
                add(roman_parent, title, text)
                continue

        match = LETTER_LINE.match(line.rstrip(JOIN))
        if match and roman_parent and rules:
            expected = [r.id for r in rules if r.id.startswith(roman_parent) and len(r.id) == len(roman_parent) + 1]
            if match.group(1) == "abcdefgh"[len(expected)]:
                title, text = split_title(match.group(2) + (JOIN if line.endswith(JOIN) else ""))
                add(f"{roman_parent}{match.group(1)}", title, text)
                continue

        if rules:
            last = rules[-1]
            if not last.text and last.title.endswith(JOIN):
                # The title itself was broken across lines
                last.title, last.text = split_title(join(last.title, line))
            else:
                last.text = join(last.text, line)
    return rules


def polish(rule: Rule) -> Rule:
    text = FACTION_ICONS.sub("", rule.text.replace(JOIN, "")).strip()
    title = rule.title.replace(JOIN, "").strip()
    if rule.id.startswith(ITEM_CHAPTERS):
        text = ITEM_TOKEN.sub(lambda m: ITEM_LETTERS[m.group(1)], text)
        title = re.sub(r"\(([MSFCHTXB])\)", lambda m: f"({ITEM_LETTERS[m.group(1)]})", title)
    if rule.id in HIRELING_ICONS:
        title = title.replace("( )", f"({HIRELING_ICONS[rule.id]} icon)")
    return Rule(rule.id, title, text, rule.section, rule.subsection)


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    rules = [polish(r) for r in parse(split_chapters(read_lines(Path(sys.argv[1]))))]
    rules = [r for r in rules if r.text or r.id.count(".") > 1]
    ids = [r.id for r in rules]
    duplicates = sorted({i for i in ids if ids.count(i) > 1})
    if duplicates:
        sys.exit(f"duplicate rule ids: {duplicates}")

    body = json.dumps([r.__dict__ for r in rules], indent=2, ensure_ascii=False)
    OUTPUT.write_text(
        "// Generated by scripts/extract_law.py from the official Law of Root PDF. Do not edit by hand.\n"
        f"export const LAW_EDITION = {json.dumps(EDITION)};\n\n"
        "export interface LawRule {\n  id: string;\n  title: string;\n  text: string;\n  section: string;\n  subsection: string;\n}\n\n"
        f"export const LAW_FULL: LawRule[] = {body};\n",
        encoding="utf-8",
    )
    print(f"{len(rules)} rules written to {OUTPUT}")


if __name__ == "__main__":
    main()
