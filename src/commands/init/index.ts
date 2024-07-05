import { Args, Command, Flags } from '@oclif/core'
import { srmFileName, srmFilePath } from '../../functions/srmFile';
import fs from 'fs-extra';
import { srmGenerate } from '../../functions/srmGenerate';



export default class Init extends Command {
  static override args = {}

  static override description = 'initialize a new meta repo'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Init)

    if (fs.existsSync(srmFilePath) && !flags.force) {
      return this.error(`A ${srmFileName} file already exists in ${process.cwd()}. Use --force to override.`)
    }
    await srmGenerate(this)

  }
}
