

export const getUsers = (state) => {
    return state.users
}
export const getProfile = (state) => {
    return state.PageProfile.profile
}
export const getIsAutorized = (state) => {
    return state.auth.isAutorized
}
export const getStatus = (state) => {
    return state.PageProfile.status
}
export const getLoginedId = (state) => {
    return state.auth.id
}
export const getPageProfileData = (state) => {
    return state.PageProfile
}
export const getAuthLogin = (state) => {
    return state.auth.login
}
export const getAuthEmail = (state) => {
    return state.auth.email
}
export const getIsFetching = (state) => {
    return state.auth.isFetching
}
export const getPageDialogData = (state) => {
    return state.PageDiaolog
}
export const getPageProfileEditMode = (state) => {
    return state.PageProfile.editMode
}
export const getPageProfiIsFetching = (state) => {
    return state.PageProfile.isFetchingProfile
}
export const getIsStatusUpdating = (state) => {
    return state.PageProfile.updatingStatus
}

