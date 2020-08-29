import React from "react";
import {sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {getIsAutorized, getPageDialogData} from "../../redux/selectors/Selector";
import {StateType} from "../../redux/reduxStore";





let mapStateToProps = (state: StateType) => {
    return { DialogPage: getPageDialogData(state),
            aurorized: getIsAutorized(state)
    }
};




const DiaolgsContainer = connect(mapStateToProps, {sendMessageActionCreator})(Dialogs as any);

export default  DiaolgsContainer;
