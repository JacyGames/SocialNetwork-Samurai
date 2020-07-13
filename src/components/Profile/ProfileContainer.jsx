import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileStatus,
    getProfileThunk,
    updateProfileStatus,
    uploadProfilePhotoThunk
} from "../../redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";
import {compose} from "redux";
import {getIsAutorized, getLoginedId, getProfile, getStatus} from "../../redux/selectors/Selector";


class ProfileAPI extends React.Component {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {

            userId = this.props.loginedId;
        }
        this.props.getProfileThunk(userId);
        this.props.getProfileStatus(userId);
    }



    componentDidMount() {
        this.updateProfile();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile();
        }
    }


    render() {
        return <Profile { ...this.props}
                        isProfileOwner={!this.props.match.params.userId}
                        profile={this.props.profile} status={this.props.status}
                        updateProfileStatus={this.props.updateProfileStatus}
                        uploadProfilePhotoThunk={this.props.uploadProfilePhotoThunk}
        />
    }


}

let mapStateToProps = (state) => ({
    profile : getProfile(state),
    auth: getIsAutorized(state),
    status: getStatus(state),
    loginedId: getLoginedId(state)
});



export default  compose(
    connect(mapStateToProps,{getProfileThunk, getProfileStatus, updateProfileStatus, uploadProfilePhotoThunk}),
    withRouter,
    withAuthRedirect
)(ProfileAPI);;