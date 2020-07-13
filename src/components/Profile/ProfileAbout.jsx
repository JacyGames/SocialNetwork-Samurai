import React from "react";
import classes from "./Profile.module.css";


export const ProfileLinks = ({text, link, socialName}) => {
    return <div className={classes.profile__about__info}>
        <span
            className={classes.profile__defaultInfo}>{text}</span>
        <span className={classes.profile__userInfo}>
            <a
                href={link}>{socialName}</a></span>
    </div>
}


export const ProfileAbout = ({text, info}) => {
    let answer;
    if (typeof info == "boolean") {

        info ? answer = "Yes" : answer = "No"

    }else {
        answer = info;
    }

    return <div className={classes.profile__about__info}><span className={classes.profile__defaultInfo}>{text}</span> <span className={classes.profile__userInfo}>{answer}</span>  </div>
}
