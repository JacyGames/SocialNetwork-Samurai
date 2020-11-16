import React from "react";
import classes from "../Profile.module.css";
import {ProfileAbout, ProfileLinks} from "../ProfileAbout";
import {ProfileType} from "../../../redux/profileReducer";

type ProfileInformationType = {
    profile: ProfileType
    setEditMode: any
    updateProfileInfo?: any
    isProfileOwner: boolean
    contacts: any
    updateProfileStatus: any
}

export const ProfileInformation: React.FC<ProfileInformationType> = (props) => {
    let key = 0;

    return <div className={classes.profile__info}>
        {props.isProfileOwner && <div>
                <button onClick={() => {
        props.setEditMode(true)
    }}>Edit
    </button>
    </div>}
    <div className={classes.profile__name}>{props.profile.fullName} </div>
        <div className={classes.profile__about}>
    <ProfileAbout text={"About me"} info={props.profile.aboutMe}/>
    <ProfileAbout text={"In job finding"} info={props.profile.lookingForAJob}/>
    {
        props.profile.lookingForAJob && <ProfileAbout text={"How i am looking for a job"}
        info={props.profile.lookingForAJobDescription}/>

    }
    {props.contacts.map((element: any) => {
        if (!element[1]) return null;
        return <ProfileLinks key={key++} text={`My ${element[0]}`} link={element[1]} socialName={element[0]}/>
    })}
    </div>
    </div>
}
