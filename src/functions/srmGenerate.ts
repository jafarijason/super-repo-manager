import { version } from "os";
import { srmVersion } from "./srmVersion";

import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import * as YAML from "js-yaml"
import { srmFileName, srmFilePath } from "./srmFile";

const init = {
    version: srmVersion,
    projects: {},
    users: {},
    groups: {
        allProjects: {
            description: 'group allProjects to access all projects',
            projects: {}
        }
    }
}

export const srmGenerate = async (thisFn) => {
    thisFn.log(`creating a ${srmFileName} file in ${process.cwd()}`)
    await fs.writeFile(srmFilePath, YAML.dump(init, {}), "utf8")
}
