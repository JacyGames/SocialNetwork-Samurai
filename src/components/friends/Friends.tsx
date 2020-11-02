import React from "react";
import {Paginator} from "../common/paginator/Paginator";
import {UserType} from "../../redux/usersReducer";
import placeholder from "../../images/user.png"
import {NavLink} from "react-router-dom";

type Props = {
    friends: Array<UserType>
    totalCount: number
    isFetching: boolean
    currentPage: number
    changePage: (page: number) => void
    unfollow: (id: number) => void
    isFollowing: Array<number>
    deleteFriend: (id: number) => void
}


export const Friends: React.FC<Props> = ({
                                             friends, totalCount, isFetching,
                                             currentPage,
                                             changePage, unfollow, isFollowing,
                                             deleteFriend
                                         }) => {
    return <div>
        <h1>My friends</h1>
        <Paginator totalCount={totalCount} itemsOnPage={10} currentPage={currentPage} pageChanged={changePage}
                   portionLength={10}/>
        <div>
            {
                friends.map((friend) => <div key={friend.id}>
                    <NavLink to={'/Profile/' + friend.id}><img style={{width: "60px"}} src={friend.photos.small || placeholder}
                                                               alt=""/></NavLink>
                    <span>{friend.name}</span>
                    <button disabled={isFollowing.some((id) => id === friend.id)} onClick={() => {
                        unfollow(friend.id);
                        deleteFriend(friend.id);

                    }}>Unfollow
                    </button>
                </div>)
            }
        </div>
    </div>
}
