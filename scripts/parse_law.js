const fs = require('fs');
const path = require('path');

const inputFile = '/Users/editor/Documents/Obsidian/Boardgames/The Law of Root.md';
const outputFile = path.join(__dirname, '../src/data/law_full.ts');

const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

const rules = [];
let currentSection = '';
let currentSubsection = '';

// Regex patterns
const itemRegex = /^\s*-\s*\*\*([A-Z\d\.]+)\s+([^\.]+)\.\*\*\s+(.+)/; 
const altItemRegex = /^\s*-\s*([IVX]+)\.\s+(.+)/; 
const subItemRegex = /^\s*-\s*([a-z])\.\s+(.+)/; // Matches "a. Infamy."

lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // Section detection (e.g., "1. Golden Rules" or "A. Advanced Setup")
    if (/^(\d+|[A-Z])\.\s+[A-Za-z]/.test(line) && !line.includes('**')) {
        currentSection = line;
        return;
    }
    
    // Subsection detection (e.g., "1.1 Rules" or "A.1 Step 1")
    if (/^(\d+|[A-Z])\.\d+\s+[A-Za-z]/.test(line) && !line.includes('**')) {
        currentSubsection = line;
        return;
    }

    // Rules
    const itemMatch = line.match(itemRegex);
    if (itemMatch) {
        rules.push({
            id: itemMatch[1],
            title: itemMatch[2],
            text: itemMatch[3],
            section: currentSection,
            subsection: currentSubsection
        });
        return;
    }

    // Sub-rules (I., II.) or (a., b.)
    if (rules.length > 0) {
        const subMatch = line.match(altItemRegex);
        if (subMatch) {
            rules[rules.length - 1].text += `\n\n**${subMatch[1]}.** ${subMatch[2]}`;
            return;
        }

        const subSubMatch = line.match(subItemRegex);
        if (subSubMatch) {
             rules[rules.length - 1].text += `\n\n*${subSubMatch[1]}.* ${subSubMatch[2]}`;
             return;
        }
    }
});

const fileContent = `export interface LawRule {
  id: string;
  title: string;
  text: string;
  section: string;
  subsection: string;
}

export const LAW_FULL: LawRule[] = ${JSON.stringify(rules, null, 2)};
`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Parsed ${rules.length} rules.`);