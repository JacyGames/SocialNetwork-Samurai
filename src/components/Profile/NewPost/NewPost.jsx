import React from "react";
import classes from "./NewPost.module.css";
import Post from "./Post/Post";
import {addPostActionCreator, changeSymbolActionCreator} from "../../../redux/data";


const NewPost = (props) => {
    let inputElem = React.createRef();

    let buttonClicker = function () {
        props.buttonClick();
    };

    let areaChanger = () => {
        let text = inputElem.current.value;
        props.changeArea(text);
    };

    return (
        <div>

            My posts
            <div>
                New post
                <input onChange={areaChanger} value={props.data.textAreaValue} ref={inputElem} type="text"/>
                <button onClick={buttonClicker}>Submit</button>
            </div>
            <div>

                {props.data.data.map(ob => <Post message={ob.messages} count={ob.likesCount}/>)}

            </div>

        </div>
    )
}
export default NewPost;