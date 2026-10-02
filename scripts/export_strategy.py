"""Export the strategy notes of the faction guides as one markdown file.

usage: python3 scripts/export_strategy.py <output.md>

The output feeds the `boardgames` RAG collection as unofficial strategy advice.
Only the `strategy` blocks are exported; setup and turn steps paraphrase the Law
of Root and are left out so they cannot compete with the official text.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

GUIDES = Path(__file__).resolve().parent.parent / "src" / "data" / "guides"
FACTIONS = {
    "marquise": "Marquise de Cat", "eyrie": "Eyrie Dynasties", "alliance": "Woodland Alliance",
    "vagabond": "Vagabond", "lizard": "Lizard Cult", "riverfolk": "Riverfolk Company",
    "duchy": "Underground Duchy", "corvid": "Corvid Conspiracy", "hundreds": "Lord of the Hundreds",
    "keepers": "Keepers in Iron",
}
STRING = r"""(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')"""
SUMMARY = re.compile(rf"summary:\s*{STRING}")
TIP = re.compile(rf"\{{\s*title:\s*{STRING},\s*text:\s*{STRING}\s*\}}")
NOTE = "Unofficial strategy notes from the Root Companion app. The Law of Root overrides them."


def text(double: str, single: str) -> str:
    return (double or single).replace("\\'", "'").replace('\\"', '"')


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    parts = ["# Root strategy notes", "", NOTE, ""]
    for slug, name in FACTIONS.items():
        source = (GUIDES / f"{slug}.ts").read_text(encoding="utf-8")
        block = source[source.index("strategy:"):]
        summary = SUMMARY.search(block)
        if summary is None:
            sys.exit(f"{slug}: no strategy summary")
        tips = TIP.findall(block)
        parts += [f"## {name} strategy", "", NOTE, "", f"Play style: {text(*summary.groups())}", ""]
        parts += [f"- {text(t[0], t[1])}: {text(t[2], t[3])}" for t in tips]
        parts.append("")
    Path(sys.argv[1]).write_text("\n".join(parts), encoding="utf-8")
    print(f"{len(FACTIONS)} factions written to {sys.argv[1]}")


if __name__ == "__main__":
    main()
