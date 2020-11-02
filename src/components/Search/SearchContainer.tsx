import React from "react";
import {SearchPage} from "./SearchPage";
import {StateType} from "../../redux/reduxStore";
import {followThunk, SearchUserThunk, unfollowThunk, UserType} from "../../redux/usersReducer";
import {getUsers} from "../../redux/selectors/Selector";
import {connect} from "react-redux";
type Props = {}
type MapStateProps = {
    searchedUsers: Array<UserType>
    isFetching: boolean
    isFollowing: Array<number>
}
type MapDispatchProps = {
    SearchUserThunk: (name: string) => void
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

class SearchContainer extends React.Component<Props & MapStateProps & MapDispatchProps> {
    render() {
        return <SearchPage searchedUsers={this.props.searchedUsers}
                           isFetching={this.props.isFetching}
                           isFollowing={this.props.isFollowing}
                           follow={this.props.followThunk}
                           unfollow={this.props.unfollowThunk}
                           SearchUserThunk={this.props.SearchUserThunk}/>
    }
}
const MapStateToProps = (state: StateType) => ({
    searchedUsers: getUsers(state).searchUsers,
    isFetching: getUsers(state).isFetching,
    isFollowing: getUsers(state).isFollowing

})

const SearchContainerConnected = connect(MapStateToProps,{SearchUserThunk, followThunk, unfollowThunk})(SearchContainer);

export default SearchContainerConnected;
