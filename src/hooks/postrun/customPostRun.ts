import { Hook } from '@oclif/core'
import { ensureRepo } from '../../functions/reposUtils';
import { bashRunAndReturn } from '../../functions/bashUtils';
import { listOfUserRepos } from '../../functions/usersUtils';

const hook: Hook<'postrun'> = async function (opts: any) {

  const gitUserEmail = await bashRunAndReturn({
    command: 'git config user.email'
  })

  const srmUserName = gitUserEmail.replace(/@/g, '__').replace(/\./g, '-')
  // srmVersion
  // console.log(opts.Command.flags)
  // console.log(opts.Command.args)
  // console.log(opts.Command.name)
  // console.log(opts)
  // process.stdout.write(`example hook running ${opts?.id}\n`)
  const listOfReposArray = listOfUserRepos(srmUserName)
  await Promise.all(listOfReposArray.map((repo) => ensureRepo(repo)))
  // console.log(listOfReposArray)
  // await ensureRepo('test1')
}

export default hook
