const fs = require('fs');
const path = require('path');

// Get the target from command line: e.g., "ai-text-summarizer-app/backend"
const targetPath = process.argv[2];

if (!targetPath) {
  console.error('❌ Error: Please provide a target path. Example: pnpm run report:gen project-name/backend');
  process.exit(1);
}

const date = new Date().toISOString().split('T')[0];
const projectParts = targetPath.split('/'); // ["ai-text-summarizer-app", "backend"]
const projectName = projectParts[0];
const subType = projectParts[1] || ''; // "backend", "frontend", or empty

// Define the directory path
const baseDir = path.join(__dirname, '../ai-gen-reports/audits', projectName, subType);

// Create directories recursively if they don't exist
fs.mkdirSync(baseDir, { recursive: true });

const fileName = `${date}-audit.md`;
const filePath = path.join(baseDir, fileName);

const template = `# AI Quality Audit: ${projectName} ${subType ? `(${subType.toUpperCase()})` : ''}
**Date:** ${date}
**Status:** 🏗️ Draft

## 📋 Scope
- **Target:** ${targetPath}
- **Engine:** Check apps-registry.json for this target.

## 🤖 AI Analysis Prompt
> "Analyze the code in ${targetPath}. Focus on [Security/Performance/Logic]. 
> Ensure all feedback is in English."

## 🔍 Findings & Edge Cases Identified by AI
1. 
2. 

## ✅ Action Plan
- [ ] Implement suggested tests in suites/${targetPath}
- [ ] Update documentation if contract changed.
`;

fs.writeFileSync(filePath, template);

console.log(`
🚀 Success! Report template created.
📍 Location: ${filePath}
`);
