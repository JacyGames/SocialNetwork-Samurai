import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Loader from "../common/loadingProgress/loading";
import {
    UsersActions,
    followThunk, getUsersAnotherPageThunk,
    getUsersThunk,
    unfollowThunk
} from "../../redux/usersReducer";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";
import {compose} from "redux";
import {getUsers} from "../../redux/selectors/Selector";
import {StateType} from "../../redux/reduxStore";

type MapDispatchType = {
    follow: any
    unfollow: any
    setuser: any
    setTotal: any
    curentPage: any
    setFetching: any
    setIsFollowing: any
    getUsersThunk: any
    getUsersAnotherPageThunk: any
    unfollowThunk: any
    followThunk: any
}
type MapStateType = {
    users: any
}
type OwnPropsType = {

}

class UsersAPI extends React.Component<MapDispatchType & MapStateType & OwnPropsType> {

    render() {
        return <div>
            {this.props.users.isFetching ? <Loader /> : null}
            <Users users={this.props.users}
                   totalCount={this.props.users.totalCount}
                   itemsOnPage={this.props.users.itemsOnPage}
                   currentPage={this.props.users.currentPage}
                   pageChanged={this.pageChanged}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                    isFollowing={this.props.users.isFollowing}
                   setIsFollowing={this.props.setIsFollowing}
                   followThunk={this.props.followThunk}
                   unfollowThunk={this.props.unfollowThunk}
            />
        </div>
    }

    componentDidMount() {

        this.props.getUsersThunk(this.props.users.currentPage,this.props.users.itemsOnPage);

    }

    pageChanged = (pageNumber: number) => {
        this.props.getUsersAnotherPageThunk(pageNumber,this.props.users.itemsOnPage,pageNumber);
    }
}



let mapStateToProps = (state: StateType): MapStateType => {
    return {
        users: getUsers(state)
    }
}

const followAC = UsersActions.follow;
const unfollowAC = UsersActions.unfollow;
const setUserAC = UsersActions.setUser;
const setTotalAC = UsersActions.setTotal;
const currentPageAC = UsersActions.currentPageAC;
const setFetchingAC = UsersActions.setFetching;
const setIsFollowingAC = UsersActions.setIsFollowing;




export default compose(
    connect(mapStateToProps, {followAC, unfollowAC, setuser: setUserAC, setTotalAC, curentPage: currentPageAC, setFetchingAC, setIsFollowingAC,getUsersThunk,getUsersAnotherPageThunk,
        unfollowThunk, followThunk}),
    withAuthRedirect
)(UsersAPI);
