import { Args, Command, Flags } from '@oclif/core'
import { updateSrmFileVersion } from '../../functions/srmFile';

export default class Update extends Command {
  static override args = {
    // version: Args.string({ description: 'update .srm.yaml with runtime version' }),
  }

  static override description = 'update srm'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    // flag with no value (-f, --force)
    version: Flags.boolean({ char: 'v' }),
    // // flag with a value (-n, --name=VALUE)
    // name: Flags.string({ char: 'n', description: 'name to print' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Update)
    if (flags.version) {
      this.log(`updating .srm.yaml with latest version`)
      await updateSrmFileVersion()
    }

    // const name = flags.version ?? 'world'
    // this.log(`hello ${name} from /Users/jason/gitea/SARAVA/SARAVA/openSource/own/super-repo-manager/src/commands/update/update.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
