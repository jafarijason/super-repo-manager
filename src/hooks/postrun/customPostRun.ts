import { Hook } from '@oclif/core'
import { ensureRepo } from '../../functions/reposUtils';

const hook: Hook<'postrun'> = async function (opts: any) {
  // srmVersion
  // console.log(opts.Command.flags)
  // console.log(opts.Command.args)
  // console.log(opts.Command.name)
  // console.log(opts)
  // process.stdout.write(`example hook running ${opts?.id}\n`)
  await ensureRepo('test1')
}

export default hook
