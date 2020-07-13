import React from "react";
import {changeMessageActionCreator, sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {getIsAutorized, getPageDialogData} from "../../redux/selectors/Selector";





let mapStateToProps = (state) => {
    return { DialogPage: getPageDialogData(state),
            aurorized: getIsAutorized(state)
    }
};




const DiaolgsContainer = connect(mapStateToProps, {sendMessageActionCreator})(Dialogs);

export default  DiaolgsContainer;