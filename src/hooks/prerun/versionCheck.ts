import { Hook, Command } from '@oclif/core'
import { srmVersion } from '../../functions/srmVersion'
import { currentSrmFileObj } from '../../functions/srmFile';


const hook: Hook<'prerun'> = async function (opts) {
  const srmObj = await currentSrmFileObj()
  if (srmObj.version !== srmVersion) {
    this.warn(`srm version is ${srmVersion} and it is not match with your workspace version ${srmObj.version}`)
    this.warn(`To address that run 'srm update version'`)
  }
  // srmVersion
  // console.log(opts.Command.flags)
  // console.log(opts.Command.args)
  // console.log(opts.Command.name)
}

export default hook
