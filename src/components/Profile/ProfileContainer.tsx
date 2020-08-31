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
    getLoginedId, getPageProfiIsFetching,
    getPageProfileEditMode,
    getProfile,
    getStatus
} from "../../redux/selectors/Selector";
import {StateType} from "../../redux/reduxStore";

type MapStateType = {
    profile: ProfileType | null
    auth: boolean
    status: string | null
    loginedId: number | null
    editMode: boolean
    isFetchingProfile: boolean
    updatingStatus: boolean
}
type MapDispatchType = {
    getProfileThunk: any
    getProfileStatus: any
    updateProfileStatus: any
    uploadProfilePhotoThunk: any
    setEditMode: any
    updateProfileInfo: any
}
type OwnPropsType = {
    match: any
}


class ProfileAPI extends React.Component<MapStateType & MapDispatchType & OwnPropsType> {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {

            userId = this.props.loginedId;
        }
        this.props.getProfileThunk(userId);
        this.props.getProfileStatus(userId);
    }


    componentDidMount() {
        this.updateProfile();

    }

    componentDidUpdate(prevProps: MapStateType & MapDispatchType & OwnPropsType, prevState: StateType, snapshot: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
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
    updatingStatus: getIsStatusUpdating(state)
});


const setEditModeForConnect = ProfileActions.setEditMode;


export default compose(
    connect(mapStateToProps, {
        getProfileThunk,
        getProfileStatus,
        updateProfileStatus,
        uploadProfilePhotoThunk,
        setEditModeForConnect,
        updateProfileInfo
    }),
    withRouter,
    withAuthRedirect
)(ProfileAPI);

