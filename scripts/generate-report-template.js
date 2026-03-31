const fs = require("fs");
const path = require("path");

// 1. Load the Registry
const registryPath = path.join(__dirname, "../config/apps-registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

// 2. Get the target ID from command line: e.g., "ai-text-summarizer-backend"
const targetId = process.argv[2];

if (!targetId) {
  console.error(
    "❌ Error: Please provide a Target ID. Example: node generate-report.js ai-text-summarizer-backend",
  );
  process.exit(1);
}

// 3. Find the Project in the Nested Structure
const project = registry.projects.find((p) => p.metadata.id === targetId);

if (!project) {
  console.error(
    `❌ Error: Project with ID "${targetId}" not found in apps-registry.json`,
  );
  process.exit(1);
}

// 4. Extract Data from the New Structure
const date = new Date().toISOString().split("T")[0];
const { name: projectName, type: projectType } = project.metadata;
const { engine, testFolder } = project.execution;

// 5. Define the Directory Path (Organized by Project Name/Type)
const baseDir = path.join(
  __dirname,
  "../ai-gen-reports/audits",
  projectName.replace(/\s+/g, "-").toLowerCase(),
  projectType,
);

// Create directories recursively
fs.mkdirSync(baseDir, { recursive: true });

const fileName = `${date}-audit.md`;
const filePath = path.join(baseDir, fileName);

// 6. Generate the Template with Real Registry Data
const template = `# AI Quality Audit: ${projectName} (${projectType.toUpperCase()})
**Date:** ${date}
**Status:** Draft

## Scope
- **Target ID:** ${targetId}
- **Engine:** ${engine.toUpperCase()}
- **Test Suite Path:** ${testFolder}

## AI Analysis Prompt
> "Analyze the code in ${project.app.rootPath}. Focus on [Security/Performance/Logic]. 
> Ensure all feedback is in English."

## 🔍 Findings & Edge Cases Identified by AI
1. 
2. 

## Action Plan
- [ ] Implement suggested tests in ${testFolder}
- [ ] Update documentation if contract changed.
`;

fs.writeFileSync(filePath, template);

console.log(`
  Success! Report template created for ${projectName}.
  Location: ${filePath}
`);
