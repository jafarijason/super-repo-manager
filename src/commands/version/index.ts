import { srmVersion } from '../../functions/srmVersion'
import { Args, Command, Flags } from '@oclif/core'


export default class Version extends Command {
  public static enableJsonFlag = true
  static override args = {}

  static override description = 'srm version'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
  }

  public async run() {
    const { args, flags } = await this.parse(Version)

    if (flags.json) {
      return { srmVersion }
    }
    this.debug(srmVersion)
    this.log(srmVersion)
  }
}



