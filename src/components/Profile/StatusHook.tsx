import React, {useEffect, useState} from "react";
import classes from './Profile.module.css'
import MiniFetchingLoader from "../common/loadingProgress/miniFetchingLoader";

type HookType = {
    status: string | null
    updateProfileStatus: any
    updatingStatus: boolean
    isProfileOwner: boolean

}

const ProfileStatusHook: React.FC<HookType> = (props) => {

   let [editMode, setEditMode] = useState(false);
   let [status, editStatus] = useState(props.status);

   let activateEditMode = () => {
       if(props.isProfileOwner){
           setEditMode(true);
       }

   }

    let deactivateEditMode = () => {
        setEditMode(false);
        if (props.status !== status) {
            props.updateProfileStatus(status);
        }
    }
    let cancelEdit = () => {
        setEditMode(false);
    }

    let inputChange = (e: any) => {
       editStatus(e.target.value);
    }
    let onEnterKey = (e: any) => {
        if (e.key === "Enter") {
            deactivateEditMode();
        }

    }
    useEffect(() => {
        editStatus(props.status)
    }, [props.status]);

    return <div>
        { props.updatingStatus ? <MiniFetchingLoader /> : editMode ?
            <div> <input onKeyDown={onEnterKey} className={classes.input} value={!status ? '' : status} onChange={inputChange} autoFocus={true}/>
                    <button className={classes.buttonSubmit} onClick={deactivateEditMode}>
                        Submit
                    </button>
                <button className={classes.buttonCancel} onClick={cancelEdit}>Cancel</button>
            </div> :
            <div onDoubleClick={activateEditMode}>{props.status || "-----"}</div>
        }
    </div>


}


export default ProfileStatusHook;
