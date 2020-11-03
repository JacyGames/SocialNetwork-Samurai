import React from "react";
import FriendsMini from "./FriendsMini";
import {connect} from "react-redux";
import {StateType} from "../../redux/reduxStore";
import {getUsers} from "../../redux/selectors/Selector";
import {getUsersThunk, UserType} from "../../redux/usersReducer";

type StateToPropsType = {
    users: Array<UserType>
    total: number,
    isFetching: boolean
}
type DispatchPropsType = {
    getUsersThunk: (currentPage: number, itemsOnPage: number, option: string) => void
}
type OwnProps = {}

class FriendsMiniContainer extends React.Component<StateToPropsType & DispatchPropsType & OwnProps> {
    state = {
        currentPage: 1
    }
    setPage = (page:number) => {
        this.setState({
            ...this.state,
            currentPage: page
        });
    }


    componentDidMount() {
        this.props.getUsersThunk(this.state.currentPage, 6, 'getMiniFriends')
    }
    componentDidUpdate(prevProps: Readonly<StateToPropsType & DispatchPropsType & OwnProps>, prevState: Readonly<{currentPage: number}>, snapshot?: any) {
        if(this.state.currentPage !== prevState.currentPage){
            this.props.getUsersThunk(this.state.currentPage, 6, 'getMiniFriends');
        }
    }

    render() {
        return <FriendsMini friends={this.props.users}
                            setPage={this.setPage}
                            totalCount={this.props.total}
                            isFetching={this.props.isFetching}
                            currentPage={this.state.currentPage}/>
    }
}

let MapStateToProps = (state: StateType) => ({
    users: getUsers(state).miniFriends,
    total: getUsers(state).totalCountFriends,
    isFetching: getUsers(state).isMiniFetching
})


export default connect(MapStateToProps, {getUsersThunk})(FriendsMiniContainer as any)
