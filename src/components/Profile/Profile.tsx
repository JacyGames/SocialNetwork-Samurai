import React from "react";
import classes from "./Profile.module.css";
import NewPostContainer from "./NewPost/NewPostContainer";
import Loader from "../common/loadingProgress/loading";
import AltProfilePic from "../../images/profilePic.jpg"
import ProfileStatusHook from "./StatusHook";
import {ProfileAbout, ProfileLinks} from "./ProfileAbout";
import FetchingInProgress from "../common/loadingProgress/fetchingLoader";
import ProfileChangeInfoFormWithProps from "../Forms/ProfileChangeInfoForm";
import {ProfileType} from "../../redux/profileReducer";

type PropsProfileType = {
    profile: ProfileType
    uploadProfilePhotoThunk: any
    isProfileOwner: boolean
    editMode: boolean
    updatingStatus: boolean
    status: string
    updateProfileStatus: any
    isFetchingProfile: boolean
    setEditMode: any
    updateProfileInfo: any
}

const Profile: React.FC<PropsProfileType> = (props) => {


    if (!props.profile) {
        return <Loader/>
    }
    let contacts = Object.entries(props.profile.contacts);
    let photoChange = (e: any) => {
        if (e.target.files.length) {
            props.uploadProfilePhotoThunk(e.target.files[0]);
        }
    }

    return <div>
        <div className={classes.profile__conatiner}>
            <div className={classes.profile__image}>
                <img src={props.profile.photos.large || AltProfilePic} alt={AltProfilePic}/>
                {
                    props.isProfileOwner && <input className={classes.inputFile} onChange={photoChange} type="file"/>
                }
                <div className={classes.profile__status}>
                    <ProfileStatusHook updatingStatus={props.updatingStatus} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
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

type ProfileInformationType = {
    profile: ProfileType
    setEditMode: any
    updateProfileInfo?: any
    isProfileOwner: boolean
    contacts: any
    updateProfileStatus: any
}

const ProfileInformation: React.FC<ProfileInformationType> = (props) => {
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
                if (!element[1]) return;
                return <ProfileLinks key={key++} text={`My ${element[0]}`} link={element[1]} socialName={element[0]}/>
            })}
        </div>
    </div>
}
type ProfileChangeType = {
    profile: ProfileType
    updateProfileInfo: any
    setEditMode: any

}

const ProfileChangeInformation: React.FC<ProfileChangeType> = ({profile, updateProfileInfo}) => {

    const submiting = (object: any) => {
        updateProfileInfo(object);
    }

    return <div>

        <ProfileChangeInfoFormWithProps handleSubmit={() => {}} error={"slkdjf"} initialValues={profile} onSubmit={submiting}/>

    </div>
}


export default Profile;
