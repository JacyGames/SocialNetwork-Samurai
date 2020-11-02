import React from "react";
import classes from "./userStyle.module.css"
import userImg from "../../images/user.png";
import {NavLink} from "react-router-dom";
import {Paginator} from "../common/paginator/Paginator";
import {InitialUsersType, UserType} from "../../redux/usersReducer";

type UsersType = {
    users: InitialUsersType
    pageChanged: any
    isFollowing: any
    unfollowThunk: any
    followThunk: any
    totalCount: number
    itemsOnPage: number
    currentPage: number
    follow: any
    unfollow: any
    setIsFollowing: any

}

const Users: React.FC<UsersType> = (props) => {
    let key = 0;
    return <div>

        <Paginator totalCount={props.users.totalCount} itemsOnPage={props.users.itemsOnPage}
                   currentPage={props.users.currentPage} pageChanged={props.pageChanged} portionLength={20}/>

        {

            props.users.users.map((u: UserType) => <div key={key++} className={classes.user}>
                <div className={classes.ava}>
                    <NavLink to={'/Profile/' + u.id}> <img className={classes.image}
                                                           src={u.photos.small != null ? u.photos.small : userImg}
                                                           alt=""/> </NavLink>
                    <div className={classes.buttonContainer}>
                        {u.followed ? <button disabled={props.isFollowing.some((id: number) => id === u.id)} onClick={() => {
                                props.unfollowThunk(u.id)


                            }} className={classes.btn} type="button">Unfollow</button> :
                            <button disabled={props.isFollowing.some((id: number) => id === u.id)} onClick={() => {
                                props.followThunk(u.id)


                            }} className={classes.btn} type="button">Follow</button>}

                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.name}>
                        <div>{u.name}</div>
                        <div>{u.status || "Status missing"}</div>
                    </div>

                </div>

            </div>)}
    </div>
}


export default Users;
