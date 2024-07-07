import { currentSrmFileObj, updateSrmFile } from './srmFile';
import _ from 'lodash';

import { SimpleGit, simpleGit } from 'simple-git';


export const getRepo = async (repo) => {
    const srmObj = await currentSrmFileObj()
    const repoObj = _.get(srmObj, `repos[${repo}]`, {})
    return repoObj

}

async function getCurrentCommit(git) {
    const log = await git.log({ n: 1 });
    return log.latest;
}

// Get the current branch
async function getCurrentBranch(git) {
    const status = await git.status();
    return status.current;
}

// Get the last commit in a remote branch
async function getLastCommitInRemoteBranch(git, { remote = null, branch }) {
    if (remote) {
        const log = await git.log([`${remote}/${branch}`], { n: 1, });
        return log.latest;
    }
    const log = await git.log([branch], { n: 1 });
    return log.latest;
}



export const ensureRepo = async (repo) => {
    const [repoObj] = await Promise.all([
        getRepo(repo),
    ])
    const repoPath = `${repoObj['relative-path']}/${repoObj['repo-name']}`
    const git: SimpleGit = simpleGit(repoPath, { binary: 'git' });

    await git.fetch();

    try {
        const [
            currentLocalBranch,
            currentCommit,
            lastCommitInRemoteCurrentBranch,
            lastCommitInRemoteSourceBranch,
        ] = await Promise.all([
            getCurrentBranch(git),
            getCurrentCommit(git),
            getLastCommitInRemoteBranch(
                git,
                {
                    remote: 'origin',
                    branch: repoObj['current'].branch
                }
            ),
            getLastCommitInRemoteBranch(
                git,
                {
                    remote: 'origin',
                    branch: repoObj['source'].branch
                }
            ),

        ])
        repoObj['local'] = {
            branch: currentLocalBranch,
            commit: currentCommit
        }

        _.set(repoObj, 'current.commit', lastCommitInRemoteCurrentBranch)
        _.set(repoObj, 'source.commit', lastCommitInRemoteSourceBranch)





        const srmObj = await currentSrmFileObj()
        _.set(srmObj, `repos[${repo}]`, repoObj)
        await updateSrmFile(srmObj)
    } catch (error) {
        console.error('Error:', error);
    }
    // const status = await git.log()
    // console.log(status)

}