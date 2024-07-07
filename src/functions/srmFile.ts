import path from 'path';
import fs from 'fs-extra';
import * as YAML from "js-yaml"
import _ from 'lodash';
import { srmVersion } from './srmVersion';
export const srmFileName = '.srm.yaml'

export const srmFilePath = path.resolve(srmFileName);

let currentSrmFileObjCached = {}

export const currentSrmFileObj = async (cache = false) => {
    if (cache && !_.isEmpty(currentSrmFileObjCached)) {
        return currentSrmFileObjCached
    }
    if (!fs.existsSync(srmFilePath)) {
        return {}
    }
    const srmFileContent = await fs.readFile(srmFilePath, 'utf8');
    const result = YAML.load(srmFileContent)
    currentSrmFileObjCached = result
    return result
}

export const updateSrmFile = async (objToUpdate) => {
    const currentSrmFile = await currentSrmFileObj();
    _.merge(currentSrmFile, objToUpdate)
    await fs.writeFile(srmFilePath, YAML.dump(currentSrmFile, {}), "utf8")
    return currentSrmFile
}


export const updateSrmFileVersion = async () => {
    return await updateSrmFile({ version: srmVersion })
}
