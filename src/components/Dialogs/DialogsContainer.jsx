import React from "react";
import {changeMessageActionCreator, sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";





let mapStateToProps = (state) => {
    return { DialogPage: state.PageDiaolog,
            aurorized: state.auth.isAutorized
    }
};

let mapDispatchToProps = (dispatch) => {
   return {
       sendMessage : () => {
           dispatch(sendMessageActionCreator())
       },
       changeMessage: (text) => {
           dispatch(changeMessageActionCreator(text))
       }
   }

};


const DiaolgsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);

export default  DiaolgsContainer;