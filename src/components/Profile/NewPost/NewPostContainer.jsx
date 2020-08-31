import React from "react";
import {addPostForEnv, clearFrom} from "../../../redux/profileReducer";
import NewPost from "./NewPost";
import {connect} from "react-redux";
import {getPageProfileData} from "../../../redux/selectors/Selector";





let mapStateToProps = (state) => {
    return {data: getPageProfileData(state)}
};




const NewPostContainer = connect(mapStateToProps,{addPostForEnv, clearFrom})(NewPost);
export default NewPostContainer;
