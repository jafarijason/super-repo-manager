import { currentSrmFileObj } from "./srmFile"
import _ from 'lodash';

export const listOfUserRepos = async (srmUserName) => {
    const srmObj = await currentSrmFileObj()
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