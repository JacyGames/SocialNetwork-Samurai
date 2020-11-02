import React from "react";
import {Friends} from "./Friends";
import {connect} from "react-redux";
import {StateType} from "../../redux/reduxStore";
import {getUsers} from "../../redux/selectors/Selector";
import {getUsersThunk, unfollowThunk, UsersActions, UserType} from "../../redux/usersReducer";

type Props = {

}
type MapStateProps = {
    friends: Array<UserType>
    totalCountFriends: number
    isFetching: boolean
    isFollowing: Array<number>
}
type MapDispatchProps = {
    getUsersThunk: (currentPage: number, itemsOnPage: number, option: string) => void
    unfollowThunk: (id: number) => void
    deleteFriend: (id: number) => void
}

class FriendsContainer extends React.Component<MapStateProps & MapDispatchProps & Props>{

    state = {
        currentPage: 1,

    }
    changePage = (page:number) => {
        this.setState({
            ...this.state,
            currentPage: page
        })
    }

    componentDidMount() {
        this.props.getUsersThunk(this.state.currentPage, 10, 'getFriends');
    }
    componentDidUpdate(prevProps: Readonly<MapStateProps & MapDispatchProps & Props>, prevState: Readonly<{currentPage: number}>, snapshot?: any) {
        if(this.state.currentPage !== prevState.currentPage){
            this.props.getUsersThunk(this.state.currentPage, 10, 'getFriends');
        }
        if(this.props.friends !== prevProps.friends){
        }
    }

    render() {
        return <Friends friends={this.props.friends}
                        totalCount={this.props.totalCountFriends}
                        isFetching={this.props.isFetching}
                        currentPage={this.state.currentPage}
                        changePage={this.changePage}
                        unfollow={this.props.unfollowThunk}
                        isFollowing={this.props.isFollowing}
                        deleteFriend={this.props.deleteFriend}
        />
    }
}
const MapStateToProps = (state: StateType) => ({
    friends: getUsers(state).friends,
    totalCountFriends: getUsers(state).totalCountFriends,
    isFetching: getUsers(state).isFetching,
    isFollowing: getUsers(state).isFollowing
});

export default connect(MapStateToProps, {getUsersThunk, unfollowThunk, deleteFriend: UsersActions.deleteFriend})(FriendsContainer);
