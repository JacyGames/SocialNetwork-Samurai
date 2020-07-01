import React from "react";
import {addPostActionCreator, changeSymbolActionCreator} from "../../../redux/profileReducer";
import NewPost from "./NewPost";
import {connect} from "react-redux";





let mapStateToProps = (state) => {
    return {data: state.PageProfile}
};

let mapDispatchToProps = (dispatch) => {
    return {
        buttonClick: () => {
            dispatch(addPostActionCreator())
        },
        changeArea: (text) => {
            dispatch(changeSymbolActionCreator(text));
        }
    }
};


const NewPostContainer = connect(mapStateToProps,mapDispatchToProps)(NewPost);
export default NewPostContainer;
