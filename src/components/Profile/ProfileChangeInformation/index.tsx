import React from "react";
import ProfileChangeInfoFormWithProps, {
    PropsInfoChangeType,
    PropsSubmitProfile
} from "../../Forms/ProfileChangeInfoForm";
import {ProfileType} from "../../../redux/profileReducer";
import {FormSubmitHandler} from "redux-form";

type ProfileChangeType = {
    profile: ProfileType
    updateProfileInfo: any
    setEditMode: any

}
type SubmitHandler = FormSubmitHandler<PropsSubmitProfile, PropsInfoChangeType>


export const ProfileChangeInformation: React.FC<ProfileChangeType> = ({profile, updateProfileInfo}) => {

    const submiting: SubmitHandler = (object: any) => {
        updateProfileInfo(object);
    }

    return <div>

        <ProfileChangeInfoFormWithProps initialValues={profile} onSubmit={submiting}/>

    </div>
}
