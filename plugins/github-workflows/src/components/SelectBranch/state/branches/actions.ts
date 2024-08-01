import { Branch } from "../../../../utils/types";


export const addBranches = (branches:Branch[]) => ({
    type: 'ADD_BRANCHES',
    payload: branches
} as const);

export const removeBranches = (branchName:string) => ({
    type: 'REMOVE_BRANCH',
    payload: branchName
} as const);

export const updateBranches = (branch:Branch)=>({
    type: 'UPDATE_BRANCHES',
    payload: branch
} as const);

export type BrancheActionType = ReturnType<typeof addBranches | typeof removeBranches | typeof updateBranches>