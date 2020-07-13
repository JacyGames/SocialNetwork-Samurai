import React from "react";
import classes from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";
import MessageTypeFrom from "../Forms/DialogsMessageForm";


const Dialogs = (props) => {

    let SendMessage = (value) => {
        props.sendMessageActionCreator(value.message);
    }


    return <div className={classes.dialog}>
        <div className={classes.chats}>
            {props.DialogPage.dialogName.map( item => <Dialog name={item.name} id={item.id}/>)}
        </div>
        <div className={classes.messages}>
            {props.DialogPage.wordsMessage.map( mes => <Message message={mes.message}/>)}

            <MessageTypeFrom onSubmit={SendMessage}/>
        </div>
    </div>

}

let DialogsWithRedirect = withAuthRedirect(Dialogs);

export default  DialogsWithRedirect;