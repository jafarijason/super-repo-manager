import { srmVersion } from '../../functions/srmVersion'
import { Args, Command, Flags } from '@oclif/core'


export default class Version extends Command {
  static override args = {}

  static override description = 'srm version'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
  }

  public async run(): Promise<void> {
    this.log(srmVersion)
  }
}
