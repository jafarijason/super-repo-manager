import { Args, Command, Flags } from '@oclif/core'
import { listOfUserReposSync } from '../../functions/usersUtils';

// const gitUserEmail = await bashRunAndReturn({
//   command: 'git config user.email'
// })

// const srmUserName = gitUserEmail.replace(/@/g, '__').replace(/\./g, '-')
// const listOfReposArray = listOfUserRepos(srmUserName)

export default class MyIndex extends Command {
  static override args = {
    file: Args.string({ description: 'file to read' }),
  }

  static override description = 'run command on projects related to your username'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    project: Flags.string({
      char: 'p',
      //@ts-ignore
      // options: listOfUserReposSync(),
      parse: (input) => {
        const options = listOfUserReposSync();
        if (!options.includes(input)) {
          throw new Error(`Invalid value: ${input}. Must be one of: ${options.join(', ')}`);
        }
        return input;
      },
    }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(MyIndex)

    console.log(listOfUserReposSync())

    // console.log(args, flags)

  }
}
