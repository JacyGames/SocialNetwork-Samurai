import React from "react";
import {UserType} from "../../redux/usersReducer";
import Loader from "../common/loadingProgress/loading";
import alternative from "../../images/user.png"
import {NavLink} from "react-router-dom";

type Props = {
    searchedUsers: Array<UserType>
    isFetching: boolean
    isFollowing: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void

}

export const SearchResponse: React.FC<Props> = (props) => {
    return <div>
        {props.isFetching ? <Loader/> : props.searchedUsers.map(user => <div key={user.id}>
            <NavLink to={"/Profile/" + user.id}><img style={{width: "60px"}} src={user.photos.small || alternative}
                                                     alt=""/> <span>{user.name}</span> </NavLink>

            {user.followed ? <button disabled={props.isFollowing.some(id => id === user.id)} onClick={() => {
                    props.follow(user.id);
                }}>Follow</button> :
                <button disabled={props.isFollowing.some(id => id === user.id)} onClick={() => {
                    props.unfollow(user.id)
                }}>Unfollow</button>}
        </div>)
        }
    </div>
}
