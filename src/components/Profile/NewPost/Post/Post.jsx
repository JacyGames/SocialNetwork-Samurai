import React from "react";
import classes from "./Post.module.css";

const  Post = (props) => {
    return (

            <div className={classes.item}>
                <img className={classes.image} src="https://i.pinimg.com/originals/02/29/cf/0229cf00478ba83e641dfd23ef0339c5.png" alt=""/>

                <div className={classes.message}>{props.message}</div>
                <span className={classes.likes}>likes {props.count}</span>

            </div>


    );
}

export default Post;