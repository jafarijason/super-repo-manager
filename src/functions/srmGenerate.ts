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
    users: {
        sampleUser: {
            username: 'jasonjafari',
            groups: [
                'level1',
                'level2',
            ]
        }
    },
    groups: {
        level1: {
            description: 'group1 with access a, b, c project',
            projects: {}
        },
        level2: {
            description: 'group2 with access a, b, c project',
            projects: {}
        },
    }
}

export const srmGenerate = async (thisFn) => {
    thisFn.log(`creating a ${srmFileName} file in ${process.cwd()}`)
    await fs.writeFile(srmFilePath, YAML.dump(init, {}), "utf8")
}
