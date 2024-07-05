import path from 'path';
import fs from 'fs-extra';
import * as YAML from "js-yaml"

export const srmFileName = '.srm.yaml'

export const srmFilePath = path.resolve(srmFileName);

export const currentSrmFileObj = async () => {
    const srmFileContent = await fs.readFile(srmFilePath, 'utf8');
    return YAML.load(srmFileContent)
}

