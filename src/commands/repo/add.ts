import { Args, Command, Flags } from '@oclif/core'
import { bashRunAndReturn, bashRunAndShowLogsPromise } from '../../functions/bashUtils';
import chalk from 'chalk';
import { currentSrmFileObj, updateSrmFile } from '../../functions/srmFile';
import _ from 'lodash';
import { ensureLineExistInGitIgnore } from '../../functions/gitignoreUtils';
import { ensureRepo } from '../../functions/reposUtils';

export default class RepoAdd extends Command {
  static override args = {}

  static override description = 'add child repository'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    "repo-name": Flags.string({ char: 'n', required: true }),
    "relative-path": Flags.string({ char: 'p', required: true }),
    "repo-url": Flags.string({ char: 'u', required: true }),
    "source-branch": Flags.string({ char: 's', required: true }),
    "current-branch": Flags.string({ char: 'c', required: true }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(RepoAdd)



    const [, srmObj, ,] = await Promise.all([
      bashRunAndReturn({
        command: `rm -rf ${flags["relative-path"]}/${flags["repo-name"]} ; mkdir -p ${flags["relative-path"]}`
      }),
      currentSrmFileObj(),
      ensureLineExistInGitIgnore(`${flags["relative-path"]}/${flags["repo-name"]}`),
    ])

    await bashRunAndShowLogsPromise({
      command: `git clone --branch  ${flags["current-branch"]} ${flags["repo-url"]} ${flags["relative-path"]}/${flags["repo-name"]}`,
      noError: true
    })

    const repoObj = {
      "repo-name": flags["repo-name"],
      "relative-path": flags["relative-path"],
      "repo-url": flags["repo-url"],
      source: {
        branch: flags["source-branch"]
      },
      current: {
        branch: flags["current-branch"]
      },
      local: {
        branch: flags["current-branch"]
      }
    }

    const groupsAllReposSet = new Set(_.get(srmObj, `groups.all.repos`, []))
    groupsAllReposSet.add(flags["repo-name"])

    _.set(
      srmObj,
      `repos[${flags["repo-name"]}]`,
      repoObj
    )
    _.set(srmObj, `groups.all.repos`, [...groupsAllReposSet])
    // console.log(srmObj)
    updateSrmFile(srmObj)

    console.log(`repo ${flags["repo-name"]} with payload of ${JSON.stringify(flags)} is added to .srm.yaml`)

    await ensureRepo(flags["repo-name"])

  }
}


