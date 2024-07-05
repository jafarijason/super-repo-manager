import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('version', () => {
  it('runs version cmd', async () => {
    const {stdout} = await runCommand('version')
    expect(stdout).to.contain('hello world')
  })

  it('runs version --name oclif', async () => {
    const {stdout} = await runCommand('version --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
