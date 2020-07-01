import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Loader from "../common/loadingProgress/loading";
import {
    curentPage,
    follow, followThunk, getUsersAnotherPageThunk,
    getUsersThunk,
    setFetching,
    setIsFollowing,
    setTotal,
    setuser,
    unfollow, unfollowThunk
} from "../../redux/usersReducer";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";
import {compose} from "redux";




class UsersAPI extends React.Component {

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

    pageChanged = (pageNumber) => {
        this.props.getUsersAnotherPageThunk(pageNumber,this.props.users.itemsOnPage,pageNumber);
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.users
    }
}


export default compose(
    connect(mapStateToProps, {follow, unfollow, setuser, setTotal, curentPage, setFetching, setIsFollowing,getUsersThunk,getUsersAnotherPageThunk,
        unfollowThunk, followThunk}),
    withAuthRedirect
)(UsersAPI);