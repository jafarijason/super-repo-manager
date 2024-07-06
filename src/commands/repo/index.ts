import { Args, Command, Flags } from '@oclif/core'

export default class RepoIndex extends Command {
  static override args = {
    action: Args.string({ description: 'add|remove|update repository' }),
  }

  // static override description = 'add, remove, update child repositories'

  // static override examples = [
  //   '<%= config.bin %> <%= command.id %>',
  // ]


  public async run(): Promise<void> {
  }
}
