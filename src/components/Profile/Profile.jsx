import React from "react";
import classes from "./Profile.module.css";
import NewPostContainer from "./NewPost/NewPostContainer";
import Loader from "../common/loadingProgress/loading";
import ProfileStatus from "./ProfileStatus";


const Profile = (props) => {
    if (!props.profile) {
        return <Loader/>
    }


    return <div>
        <div className={classes.profile__conatiner}>
            <div className={classes.profile__image}>
                <img src={props.profile.photos.large} alt=""/>
            </div>
            <div className={classes.profile__info}>
                <div className={classes.profile__name}>{props.profile.fullName} </div>
                <div className={classes.profile__status}>
                    <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus}/>
                </div>
                <div className={classes.profile__about}>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>About me :</span> <span className={classes.profile__userInfo}>{props.profile.aboutMe}</span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>Looking for a job :</span> <span className={classes.profile__userInfo}>{props.profile.lookingForAJob ? "yes" : "no"}</span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>How I finding my job:</span> <span className={classes.profile__userInfo}>{props.profile.lookingForAJobDescription}</span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My Facebook:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.facebook}>facebook</a></span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My Github:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.github}>github</a></span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My Instagram:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.instagram}>instagram</a></span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My Main link:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.mainLink}>mainLink</a></span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My Twitter:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.twitter}>twitter</a></span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My VK:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.vk}>vk</a></span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My Website:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.website}>website</a></span>  </div>
                    <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>My Youtube:</span> <span className={classes.profile__userInfo}><a href={props.profile.contacts.youtube}>youtube</a></span>  </div>

                </div>
            </div>


        </div>



        <NewPostContainer/>

    </div>
}
export default Profile;