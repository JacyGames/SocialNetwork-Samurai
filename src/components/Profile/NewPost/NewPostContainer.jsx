import React from "react";
import {addPostActionCreator, changeSymbolActionCreator, clearFrom} from "../../../redux/profileReducer";
import NewPost from "./NewPost";
import {connect} from "react-redux";
import {getPageProfileData} from "../../../redux/selectors/Selector";





let mapStateToProps = (state) => {
    return {data: getPageProfileData(state)}
};




const NewPostContainer = connect(mapStateToProps,{addPostActionCreator, clearFrom})(NewPost);
export default NewPostContainer;
