import React from "react";
import classes from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";
import MessageTypeFrom from "../Forms/DialogsMessageForm";
import {compose} from "redux";
import {clearMessageFrom, initialType} from "../../redux/dialogsReducer";
import {connect} from "react-redux";

type PropsType = {
    DialogPage: initialType
    sendMessageActionCreator: (message: string) => void
    clearMessageFrom: () => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    let key = 0;

    let SendMessage = (value: { message: string }) => {
        props.sendMessageActionCreator(value.message);
        props.clearMessageFrom();
    }


    return <div className={classes.dialog}>
        <div className={classes.chats}>
            {props.DialogPage.dialogName.map( item => <Dialog key={key++} name={item.name} id={item.id}/>)}
        </div>
        <div className={classes.messages}>
            {props.DialogPage.wordsMessage.map( mes => <Message key={key++} message={mes.message}/>)}

            <MessageTypeFrom onSubmit={SendMessage}/>
        </div>
    </div>

}

let DialogsWithRedirect = compose(
    connect(null,{clearMessageFrom}),
    withAuthRedirect)(Dialogs);

export default  DialogsWithRedirect;
