import React from "react";
import Search from "./Search";
import {SearchResponse} from "./SearchResponse";
import {UserType} from "../../redux/usersReducer";

type Props = {
    searchedUsers: Array<UserType>
    SearchUserThunk: (name: string) => void
    isFetching: boolean
    isFollowing: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}

export const SearchPage: React.FC<Props> = (props) => {
    const submit = (value: { searchInput: string }) => {
        props.SearchUserThunk(value.searchInput);
    }

    return <div>
        <Search onSubmit={submit} isFetching={props.isFetching}/>
        <SearchResponse isFollowing={props.isFollowing} follow={props.follow} unfollow={props.unfollow}
                        isFetching={props.isFetching} searchedUsers={props.searchedUsers}/>
    </div>
}
