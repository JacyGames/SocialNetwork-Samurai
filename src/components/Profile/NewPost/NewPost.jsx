import React from "react";
import classes from "./NewPost.module.css";
import Post from "./Post/Post";
import AddNewPost from "../../Forms/ProfileAddPostForm";


const NewPost = React.memo(props => {

    console.log("RENDER");

    let addPost = function (value) {
        props.addPostActionCreator(value.newpost);
    };


    return (
        <div className={classes.postscontainer}>

           <AddNewPost onSubmit={addPost}/>
            <div>

                {props.data.data.map(ob => <Post message={ob.messages} count={ob.likesCount}/>)}

            </div>

        </div>
    )
})
export default NewPost;