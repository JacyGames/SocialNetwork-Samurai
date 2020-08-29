import React from "react";
import classes from "./NewPost.module.css";
import Post from "./Post/Post";
import AddNewPost from "../../Forms/ProfileAddPostForm";



const NewPost = React.memo(props => {
    

    let addPost = function (value) {
        props.addPostActionCreator(value.newpost);
        props.clearFrom();

    };
    let key = 0;


    return (
        <div className={classes.postscontainer}>

           <AddNewPost onSubmit={addPost}/>
            <div>

                {props.data.data.map(ob => <Post key={key++} message={ob.messages} count={ob.likesCount}/>)}

            </div>

        </div>
    )
})
export default NewPost;
