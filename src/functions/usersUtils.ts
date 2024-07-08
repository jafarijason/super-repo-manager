import { currentSrmFileObj } from "./srmFile"
import _ from 'lodash';
import { bashRunAndReturn } from '../functions/bashUtils';
import { bashRunAndReturnSync } from './bashUtils';

export const listOfUserRepos = (srmUserName) => {
    const srmObj = currentSrmFileObj()
    const users = srmObj.users
    const currentUser = users[srmUserName]
    if (!currentUser || _.isEmpty(currentUser)) {
        console.warn(`user ${currentUser} is not exist`)
    }
    // console.log(currentUser)
    const repos = srmObj.repos
    const groups = srmObj.groups
    const reposSet = new Set();

    (currentUser.reposInclude || []).forEach((repo) => {
        reposSet.add(repo)
    });

    (currentUser.groupsInclude || []).forEach((group) => {
        const groupObj = groups[group]
        if (!groupObj || _.isEmpty(groupObj)) {
            return
        }
        const groupRepos = groupObj.repos || []
        groupRepos.forEach((repo) => {
            reposSet.add(repo)
        })
    });

    return [...reposSet]
    // currentUser.
}
export const listOfUserGroups = (srmUserName) => {
    const srmObj = currentSrmFileObj()
    const users = srmObj.users
    const currentUser = users[srmUserName]
    if (!currentUser || _.isEmpty(currentUser)) {
        console.warn(`user ${currentUser} is not exist`)
    }
    return currentUser.groupsInclude || []
}

export const listOfUserReposSync = () => {

    const gitUserEmail = bashRunAndReturnSync({
        command: 'git config user.email'
    })

    // return gitUserEmail

    const srmUserName = gitUserEmail.replace(/@/g, '__').replace(/\./g, '-')
    const listOfReposArray = listOfUserRepos(srmUserName)
    return listOfReposArray || []

    // return
}

export const listOfUserGroupsSync = () => {

    const gitUserEmail = bashRunAndReturnSync({
        command: 'git config user.email'
    })

    // return gitUserEmail

    const srmUserName = gitUserEmail.replace(/@/g, '__').replace(/\./g, '-')
    const listOfUserGroupsArray = listOfUserGroups(srmUserName)
    return listOfUserGroupsArray || []

    // return
}