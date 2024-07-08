import fs from 'fs-extra';
import path from 'path';

export const gitignorefile = '.gitignore'

export const gitignorefileFilePath = path.resolve(gitignorefile);

export const loadGitignore = () => {
    const gitignorefileContent = fs.readFileSync(gitignorefileFilePath, 'utf8') || '';
    return gitignorefileContent
}

export const searchInGitIgnore = (searchLine) => {
    const gitignorefileContent = loadGitignore()
    const lines = gitignorefileContent.split('\n');
    if (!lines.includes(searchLine)) {
        return false
    }
    return true
}

export const ensureLineExistInGitIgnore = (searchLine) => {
    const checkIfLineExist = searchInGitIgnore(searchLine)
    if (!checkIfLineExist) {
        fs.appendFileSync(gitignorefileFilePath, `# .srm.yaml\n${searchLine}\n`)
    }
}