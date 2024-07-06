import fs from 'fs-extra';
import path from 'path';

export const gitignorefile = '.gitignore'

export const gitignorefileFilePath = path.resolve(gitignorefile);

export const loadGitignore = async () => {
    const gitignorefileContent = await fs.readFile(gitignorefileFilePath, 'utf8') || '';
    return gitignorefileContent
}

export const searchInGitIgnore = async (searchLine) => {
    const gitignorefileContent = await loadGitignore()
    const lines = gitignorefileContent.split('\n');
    if (!lines.includes(searchLine)) {
        return false
    }
    return true
}

export const ensureLineExistInGitIgnore = async (searchLine) => {
    const checkIfLineExist = await searchInGitIgnore(searchLine)
    if (!checkIfLineExist) {
        await fs.appendFile(gitignorefileFilePath, `# .srm.yaml\n${searchLine}\n`)
    }
}