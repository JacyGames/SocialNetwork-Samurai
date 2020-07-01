import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileStatus, getProfileThunk, updateProfileStatus} from "../../redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";
import {compose} from "redux";


class ProfileAPI extends React.Component {


    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            if(this.props.loginedId){
                userId = this.props.loginedId;
            }else{
                userId = 2;
            }

        }

      this.props.getProfileThunk(userId);
        this.props.getProfileStatus(userId);

    }

    render() {
        return <Profile { ...this.props} profile={this.props.profile} status={this.props.status} updateProfileStatus={this.props.updateProfileStatus}/>
    }


}

let mapStateToProps = (state) => ({
    profile : state.PageProfile.profile,
    auth: state.auth.isAutorized,
    status: state.PageProfile.status,
    loginedId: state.auth.id
});



export default  compose(
    connect(mapStateToProps,{getProfileThunk, getProfileStatus, updateProfileStatus}),
    withRouter,
    withAuthRedirect
)(ProfileAPI);;