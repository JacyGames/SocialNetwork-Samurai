import React, {useEffect, useState} from "react";
import classes from './Profile.module.css'

const ProfileStatusHook = (props) => {

   let [editMode, setEditMode] = useState(false);
   let [status, editStatus] = useState(props.status);

   let activateEditMode = () => {
       setEditMode(true);
   }

    let deactivateEditMode = () => {
        setEditMode(false);
        if (props.status !== status) {
            props.updateProfileStatus(status);
        }
    }

    let inputChange = (e) => {
       editStatus(e.target.value);
    }

    useEffect(() => {
        editStatus(props.status)
    }, [props.status]);

    return <div>
        { editMode ?
            <div> <input className={classes.input} value={status} onChange={inputChange} autoFocus={true}/>
                    <button className={classes.buttonSubmit} onClick={deactivateEditMode}>
                        Submit
                    </button>
            </div> :
            <div onDoubleClick={activateEditMode}>{props.status || "-----"}</div>
        }
    </div>


}


export default ProfileStatusHook;