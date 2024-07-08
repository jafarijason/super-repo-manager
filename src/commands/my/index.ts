import { Args, Command, Flags } from '@oclif/core'
import { listOfUserReposSync, listOfUserGroupsSync } from '../../functions/usersUtils';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getListOfReposForGroup, getRepo } from '../../functions/reposUtils';
import { bashRunAndShowLogsPromise } from '../../functions/bashUtils';

export default class MyIndex extends Command {

  static override description = 'run command on projects related to your username'


  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    project: Flags.string({
      char: 'p',
      //@ts-ignore
      parse: (input) => {
        const options = listOfUserReposSync();
        if (!options.includes(input)) {
          throw new Error(`Invalid value: ${input}. Must be one of: ${options.join(', ')}`);
        }
        return input;
      },
      exclusive: ['group'],
    }),
    group: Flags.string({
      char: 'p',
      //@ts-ignore
      parse: (input) => {
        const options = listOfUserGroupsSync();
        if (!options.includes(input)) {
          throw new Error(`Invalid value: ${input}. Must be one of: ${options.join(', ')}`);
        }
        return input;
      },
      exclusive: ['project'],
    }),
  }
  static strict = false

  public async run(): Promise<any> {

    // const argv = yargs(hideBin(process.argv)).help(false).argv

    // const args = { ...argv };

    // console.log(argv)
    // console.log(args)
    // console.log(process.argv)
    const { args, flags, argv } = await this.parse(MyIndex)

    if (flags.project) {
      const repo = getRepo(flags.project)
      const repoPath = `${repo['relative-path']}/${repo['repo-name']}`
      await bashRunAndShowLogsPromise({
        command: `cd ${repoPath}; ${argv.join(' ')}`,
        prefix: `####################${flags.project}####################`
      })
      return
    }



    if (flags.group) {
      const groupReposList = getListOfReposForGroup(flags.group)
      await Promise.all(
        groupReposList.map(async (repoKey) => {
          const repo = getRepo(repoKey)
          const repoPath = `${repo['relative-path']}/${repo['repo-name']}`
          await bashRunAndShowLogsPromise({
            command: `cd ${repoPath}; ${argv.join(' ')}`,
            prefix: `####################${repoKey}####################`
          })
        })
      )
      return
    }

    await Promise.all(
      listOfUserReposSync().map(async (repoKey) => {
        const repo = getRepo(repoKey)
        const repoPath = `${repo['relative-path']}/${repo['repo-name']}`
        await bashRunAndShowLogsPromise({
          command: `cd ${repoPath}; ${argv.join(' ')}`,
          prefix: `####################${repoKey}####################`
        })
      })
    )

  }
}
