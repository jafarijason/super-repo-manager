import fs from 'fs-extra';
import path from 'path';
import { currentSrmFileObj, updateSrmFile } from './srmFile';
import _ from 'lodash';

import { SimpleGit, simpleGit } from 'simple-git';
import { bashRunAndShowLogsPromise } from './bashUtils';


export const getRepo = (repo) => {
    const srmObj = currentSrmFileObj()
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


export const doesDirectoryExist = (dirPath) => {
    return fs.existsSync(path.resolve(dirPath));
}

export const ensureRepo = async (repo) => {
    const [repoObj] = await Promise.all([
        getRepo(repo),
    ])
    const repoPath = `${repoObj['relative-path']}/${repoObj['repo-name']}`

    if (!doesDirectoryExist(repoPath)) {
        console.log(`repository ${repo} is not exist on ${repoPath}, Cloning ...`)
        await bashRunAndShowLogsPromise({
            command: `git clone --branch  ${repoObj["current"].branch} ${repoObj["repo-url"]} ${repoObj["relative-path"]}/${repoObj["repo-name"]}`,
            noError: true
        })
    }

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





        const srmObj = currentSrmFileObj()
        _.set(srmObj, `repos[${repo}]`, repoObj)
        await updateSrmFile(srmObj)
    } catch (error) {
        console.error('Error:', error);
    }
    // const status = await git.log()
    // console.log(status)

}

export const getListOfReposForGroup = (group) => {
    const srmObj = currentSrmFileObj()
    const groupObj = _.get(srmObj, `groups[${group}]`, {})
    const reposArray = _.get(groupObj, `repos`, [])
    return reposArray
}