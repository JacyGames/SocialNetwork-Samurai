import React from "react";
import classes from "./Profile.module.css";
import NewPostContainer from "./NewPost/NewPostContainer";
import Loader from "../common/loadingProgress/loading";
import AltProfilePic from "../../images/profilePic.jpg"
import ProfileStatusHook from "./StatusHook";
import FetchingInProgress from "../common/loadingProgress/fetchingLoader";
import {ProfileType} from "../../redux/profileReducer";
import {UserType} from "../../redux/usersReducer";
import {ProfileInformation} from "./ProfileInformation";
import {ProfileChangeInformation} from "./ProfileChangeInformation";

type PropsProfileType = {
    friends: Array<UserType>
    users: Array<UserType>
    miniFriends: Array<UserType>
    searchedUsers: Array<UserType>
    profile: ProfileType | null
    isFollowing: Array<number>
    uploadProfilePhotoThunk: any
    isProfileOwner: boolean
    editMode: boolean
    updatingStatus: boolean
    status: string | null
    updateProfileStatus: any
    isFetchingProfile: boolean
    setEditMode: any
    updateProfileInfo: any
    isUpdating: boolean
    follow: any
    unfollow: any
    match: {
        isExact: boolean
        params: {
            userId: any
        }
        path: string
        url: string
    }
}

const Profile: React.FC<PropsProfileType> = (props) => {
    if (!props.profile) {
        return <Loader/>
    }
    if (props.isUpdating) {
        return <Loader/>
    }
    let contacts = Object.entries(props.profile.contacts);
    let photoChange = (e: any) => {
        if (e.target.files.length) {
            props.uploadProfilePhotoThunk(e.target.files[0]);
        }
    }
    let allUsers = [...props.miniFriends, ...props.users, ...props.friends, ...props.searchedUsers];
    return <div>
        <div className={classes.profile__conatiner}>
            <div className={classes.profile__image}>
                <img src={props.profile.photos.large || AltProfilePic} alt={AltProfilePic}/>
                {
                    props.isProfileOwner && <input className={classes.inputFile} onChange={photoChange} type="file"/>
                }
                <div className={classes.profile__status}>
                    <ProfileStatusHook isProfileOwner={props.isProfileOwner} updatingStatus={props.updatingStatus}
                                       status={props.status} updateProfileStatus={props.updateProfileStatus}/>
                    {!props.isProfileOwner && <div>
                        {allUsers.some((friend) => friend.id === parseInt(props.match.params.userId) && friend.followed) ?
                            <button onClick={() => {
                                props.unfollow(props.match.params.userId)
                            }}
                                    disabled={props.isFollowing.some((id) => id === props.match.params.userId)}>Unfollow
                            </button> : <button onClick={() => {
                                props.follow(props.match.params.userId)
                            }}
                                                disabled={props.isFollowing.some((id) => id === props.match.params.userId)}>Follow
                            </button>
                        }
                    </div>}
                </div>
            </div>
            {!props.editMode && !props.isFetchingProfile ? <ProfileInformation profile={props.profile}
                                                                               updateProfileStatus={props.updateProfileStatus}
                                                                               setEditMode={props.setEditMode}
                                                                               contacts={contacts}
                                                                               isProfileOwner={props.isProfileOwner}
            /> : props.isFetchingProfile ? <FetchingInProgress/> :
                <ProfileChangeInformation profile={props.profile} setEditMode={props.setEditMode}
                                          updateProfileInfo={props.updateProfileInfo}/>}
        </div>
        <h2>My posts</h2>
        <NewPostContainer/>
    </div>
}

export default Profile;
