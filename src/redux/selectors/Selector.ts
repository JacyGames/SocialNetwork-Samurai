import {StateType} from "../reduxStore";


export const getUsers = (state: StateType) => {
    return state.users
}
export const getProfile = (state: StateType) => {
    return state.PageProfile.profile
}
export const getIsAutorized = (state: StateType) => {
    return state.auth.isAutorized
}
export const getStatus = (state: StateType) => {
    return state.PageProfile.status
}
export const getLoginedId = (state: StateType) => {
    return state.auth.id
}
export const getPageProfileData = (state: StateType) => {
    return state.PageProfile
}
export const getAuthLogin = (state: StateType) => {
    return state.auth.login
}
export const getAuthEmail = (state: StateType) => {
    return state.auth.email
}
export const getIsFetching = (state: StateType) => {
    return state.auth.isFetching
}
export const getPageDialogData = (state: StateType) => {
    return state.PageDiaolog
}
export const getPageProfileEditMode = (state: StateType) => {
    return state.PageProfile.editMode
}
export const getPageProfiIsFetching = (state: StateType) => {
    return state.PageProfile.isFetchingProfile
}
export const getIsStatusUpdating = (state: StateType) => {
    return state.PageProfile.updatingStatus
}

