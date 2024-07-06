import { Hook, Command } from '@oclif/core'
import { srmVersion } from '../../functions/srmVersion'
import { currentSrmFileObj, srmFilePath, updateSrmFile } from '../../functions/srmFile';
import fs from 'fs-extra';
import { bashRunAndReturn } from '../../functions/bashUtils';
import _ from 'lodash';


const hook: Hook<'prerun'> = async function (opts) {
  const [gitUserName, gitUserEmail, srmObj] = await Promise.all([
    bashRunAndReturn({
      command: 'git config user.name'
    }),
    bashRunAndReturn({
      command: 'git config user.email'
    }),
    currentSrmFileObj()
  ])
  const srmUserName = gitUserEmail.replace(/@/g, '__').replace(/\./g, '-')

  if (!gitUserName) {
    this.error(`git user.name is not exist, 'git config user.name "Your Name"'`)
    return
  }
  if (!gitUserEmail) {
    this.error(`git user.name is not exist, 'git config user.email "Your git email"'`)
    return
  }


  if (!srmObj.version) {
    this.warn(`it seems .srm.yaml file is not exist to your workspace, command to create 'srm init'`)
    if (opts.Command.name !== 'Init') {
      this.error(`Stopped!`)
      process.exit(1)
    }
  } else if (srmObj.version !== srmVersion) {
    this.warn(`srm version is ${srmVersion} and it is not match with your workspace version ${srmObj.version}`)
    this.warn(`To address that run 'srm update -v'`)
  }

  if (srmObj.version && !_.get(srmObj, `users[${srmUserName}]`)) {
    _.set(
      srmObj,
      `users[${srmUserName}]`,
      {
        name: gitUserName,
        email: gitUserEmail,
        groupsInclude: [],
        reposInclude: []
      }
    )
    await updateSrmFile(srmObj)
  }

  // srmVersion
  // console.log(opts.Command.flags)
  // console.log(opts.Command.args)
  // console.log(opts.Command.name)
}

export default hook
