import React from "react";
import c from "./FriendsMini.module.css";
import {UserType} from "../../redux/usersReducer";
import alternative from "../../images/lostImage.png";
import {PaginatorSmall} from "../common/paginator/PaginatorSmall";
import LoaderSmall from "../common/loadingProgress/LoaderSmall";
import {NavLink} from "react-router-dom";

type Props = {
    friends: Array<UserType>
    setPage: (page: number) => void
    totalCount: number
    isFetching: boolean
    currentPage: number
};

const FriendsMini: React.FC<Props> = ({friends, totalCount, setPage, isFetching, currentPage}) => {

    return <div className={c.friendsMiniWrap}>
        {isFetching ? <LoaderSmall /> : <div>
            {friends.map((friend) =><NavLink key={friend.id} className={c.friendsLink} to={'/Profile/' + friend.id}> <div className={c.friendsMiniItem} key={friend.id}>

                    <img className={c.friendsMiniItemImg} src={friend.photos.small || alternative} alt=""/>
                    <span className={c.friendsMiniItemName}> {friend.name} </span>



            </div>  </NavLink>)}
            <PaginatorSmall totalCount={totalCount} itemsOnPage={6} currentPage={currentPage} pageChanged={setPage}
                            portionLength={6}/>
        </div>}

    </div>
}

export default FriendsMini;
