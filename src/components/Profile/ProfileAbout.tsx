import React from "react";
import classes from "./Profile.module.css";

type ProfileLinksType = {
    text: string
    link: string
    socialName: string
}

export const ProfileLinks: React.FC<ProfileLinksType> = ({text, link, socialName}) => {
    return <div className={classes.profile__about__info}>
        <span
            className={classes.profile__defaultInfo}>{text}</span>
        <span className={classes.profile__userInfo}>
            <a
                href={link}>{socialName}</a></span>
    </div>
}

type ProfileAboutType = {
    text: string
    info: any
}

export const ProfileAbout: React.FC<ProfileAboutType> = ({text, info}) => {
    let answer;
    if (typeof info == "boolean") {

        info ? answer = "Yes" : answer = "No"

    }else {
        answer = info;
    }

    return <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>{text}</span> <span className={classes.profile__userInfo}>{answer}</span>  </div>
}
