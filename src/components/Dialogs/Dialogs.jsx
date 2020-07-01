import React from "react";
import classes from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import Login from "../Login/Login";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../Hok/wihtAuthRedirect";




const Dialogs = (props) => {
    let inputElem = React.createRef();

    let ButtonEvent = () => {
        props.sendMessage();
    }

    let onmesschange = () => {
        let  text= inputElem.current.value;
        props.changeMessage(text);
    }

    return <div className={classes.dialog}>
        <div className={classes.chats}>
            {props.DialogPage.dialogName.map( item => <Dialog name={item.name} id={item.id}/>)}
        </div>
        <div className={classes.messages}>
            {props.DialogPage.wordsMessage.map( mes => <Message message={mes.message}/>)}
            <input ref={inputElem}
                   onChange={onmesschange}
                   value={props.DialogPage.dialogArea}
                   type="text"/> <button onClick={ButtonEvent}>Send</button>
        </div>
    </div>

}

let DialogsWithRedirect = withAuthRedirect(Dialogs);

export default  DialogsWithRedirect;