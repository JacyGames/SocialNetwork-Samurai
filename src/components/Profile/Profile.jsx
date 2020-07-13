import React from "react";
import classes from "./Profile.module.css";
import NewPostContainer from "./NewPost/NewPostContainer";
import Loader from "../common/loadingProgress/loading";
import AltProfilePic from "../../images/profilePic.jpg"
import ProfileStatusHook from "./StatusHook";
import {ProfileAbout, ProfileLinks} from "./ProfileAbout";


const Profile = (props) => {
    if (!props.profile) {
        return <Loader/>
    }
    let contacts = Object.entries(props.profile.contacts);
    let photoChange = (e) => {
        if(e.target.files.length) {
            props.uploadProfilePhotoThunk(e.target.files[0]);
        }
    }

    return <div>
        <div className={classes.profile__conatiner}>
            <div className={classes.profile__image}>
                <img src={props.profile.photos.large || AltProfilePic} alt={AltProfilePic}/>
            </div>
            {
                props.isProfileOwner && <input onChange={photoChange} type="file"/>
            }

            <div className={classes.profile__info}>
                <div className={classes.profile__name}>{props.profile.fullName} </div>
                <div className={classes.profile__status}>
                    <ProfileStatusHook status={props.status} updateProfileStatus={props.updateProfileStatus}/>
                </div>
                <div className={classes.profile__about}>
                    <ProfileAbout text={"About me"} info={props.profile.aboutMe}/>
                    <ProfileAbout text={"In job finding"} info={props.profile.lookingForAJob}/>
                    <ProfileAbout text={"How i am looking for a job"} info={props.profile.lookingForAJobDescription}/>
                    {contacts.map(element => {
                        if (!element[1]) return;
                        return <ProfileLinks text={`My ${element[0]}`} link={element[1]} socialName={element[0]}/>
                    })}
                </div>
            </div>
        </div>
        <h2>My posts</h2>
        <NewPostContainer/>

    </div>
}
export default Profile;