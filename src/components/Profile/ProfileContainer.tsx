import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileStatus,
    getProfileThunk, ProfileType, ProfileActions, updateProfileInfo,
    updateProfileStatus,
    uploadProfilePhotoThunk
} from "../../redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";
import {compose} from "redux";
import {
    getIsAutorized, getIsStatusUpdating,
    getLoginedId, getPageProfiIsFetching, getPageProfileData,
    getPageProfileEditMode,
    getProfile,
    getStatus, getUsers
} from "../../redux/selectors/Selector";
import {StateType} from "../../redux/reduxStore";
import {followThunk, unfollowThunk, UserType} from "../../redux/usersReducer";

type MapStateType = {
    profile: ProfileType | null
    auth: boolean
    status: string | null
    loginedId: number | null
    editMode: boolean
    isFetchingProfile: boolean
    updatingStatus: boolean
    isUpdating: boolean
    isFollowing: Array<number>
    friends: Array<UserType>
    users: Array<UserType>
    miniFriends: Array<UserType>
    searchedUsers: Array<UserType>
}
type MapDispatchType = {
    getProfileThunk: any
    getProfileStatus: any
    updateProfileStatus: any
    uploadProfilePhotoThunk: any
    setEditMode: any
    updateProfileInfo: any
    unfollowThunk: any
    followThunk: any

}
type OwnPropsType = {
    match: {
        isExact: boolean
        params: {
            userId: any
        }
        path: string
        url: string
    }
}


class ProfileAPI extends React.PureComponent<MapStateType & MapDispatchType & OwnPropsType> {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.loginedId;
        }
        if(userId){
            this.props.getProfileThunk(parseInt(userId));
            this.props.getProfileStatus(parseInt(userId));
        }
    }
    componentDidMount() {
        if (!this.props.profile && !this.props.isUpdating) {
            this.updateProfile();
        }


    }

    componentDidUpdate(prevProps: MapStateType & MapDispatchType & OwnPropsType, prevState: StateType, snapshot: any) {
        if (this.props.match.params.userId !== undefined && parseInt(this.props.match.params.userId) !== this.props.profile?.userId && !this.props.isUpdating) {

            this.updateProfile();
        }
        if (this.props.match.params.userId === undefined && this.props.profile?.userId !== this.props.loginedId && !this.props.isUpdating) {
            this.updateProfile();
        }

    }


    render() {
        return <Profile {...this.props}
                        isProfileOwner={!this.props.match.params.userId}
                        profile={this.props.profile} status={this.props.status}
                        updateProfileStatus={this.props.updateProfileStatus}
                        uploadProfilePhotoThunk={this.props.uploadProfilePhotoThunk}
                        setEditMode={this.props.setEditMode}
                        editMode={this.props.editMode}
                        updateProfileInfo={this.props.updateProfileInfo}
                        isFetchingProfile={this.props.isFetchingProfile}
                        updatingStatus={this.props.updatingStatus}
                        follow={this.props.followThunk}
                        unfollow={this.props.unfollowThunk}
                        match={this.props.match}
                        isFollowing={this.props.isFollowing}
                        friends={this.props.friends}
                        users={this.props.users}
                        miniFriends={this.props.miniFriends}
                        searchedUsers={this.props.searchedUsers}
        />
    }


}


let mapStateToProps = (state: StateType): MapStateType => ({
    profile: getProfile(state),
    auth: getIsAutorized(state),
    status: getStatus(state),
    loginedId: getLoginedId(state),
    editMode: getPageProfileEditMode(state),
    isFetchingProfile: getPageProfiIsFetching(state),
    updatingStatus: getIsStatusUpdating(state),
    isUpdating: getPageProfileData(state).setIsUpdating,
    isFollowing: getUsers(state).isFollowing,
    friends: getUsers(state).friends,
    users: getUsers(state).users,
    miniFriends: getUsers(state).miniFriends,
    searchedUsers: getUsers(state).searchUsers
});


const setEditModeForConnect = ProfileActions.setEditMode;


export default compose(
    connect(mapStateToProps, {
        getProfileThunk,
        getProfileStatus,
        updateProfileStatus,
        uploadProfilePhotoThunk,
        setEditModeForConnect,
        updateProfileInfo,
        followThunk,
        unfollowThunk
    }),
    withRouter,
    withAuthRedirect
)(ProfileAPI);

