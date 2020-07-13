import React from "react";
import classes from "./userStyle.module.css"
import userImg from "../../images/user.png";
import {NavLink} from "react-router-dom";
import {Paginator} from "../common/paginator/Paginator";


const Users = (props) => {
    return <div>

        <Paginator totalCount={props.users.totalCount} itemsOnPage={props.users.itemsOnPage}
                   currentPage={props.users.currentPage} pageChanged={props.pageChanged} portionLength={20}/>

        {

            props.users.users.map(u => <div className={classes.user}>
                <div className={classes.ava}>
                    <NavLink to={'/Profile/' + u.id}> <img className={classes.image}
                                                           src={u.photos.small != null ? u.photos.small : userImg}
                                                           alt=""/> </NavLink>
                    <div className={classes.buttonContainer}>
                        {u.followed ? <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {
                                props.unfollowThunk(u.id)


                            }} className={classes.btn} type="button">Unfollow</button> :
                            <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {
                                props.followThunk(u.id)


                            }} className={classes.btn} type="button">Follow</button>}

                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.name}>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div className={classes.location}>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </div>
                </div>

            </div>)}
    </div>
}


export default Users;