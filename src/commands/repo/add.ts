import { Args, Command, Flags } from '@oclif/core'

export default class RepoAdd extends Command {
  static override args = {}

  static override description = 'add child repository'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    "repo-name": Flags.string({ char: 'n', required: true }),
    "path": Flags.string({ char: 'p', required: true }),
    "repo-url": Flags.string({ char: 'u', required: true }),
    "source-branch": Flags.string({ char: 's', required: true }),
    "current-branch": Flags.string({ char: 'c', required: true }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(RepoAdd)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /Users/jason/gitea/SARAVA/SARAVA/openSource/own/super-repo-manager/src/commands/repo/add.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
