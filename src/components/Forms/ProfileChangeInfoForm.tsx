import React from "react";
import {Field, reduxForm} from "redux-form";
import {Inputmine} from "../common/CustomHTML/ValidateInput";
import Error from "../common/errors/Error";

type PropsType = {
    handleSubmit: () => void
    error: string
}

const ProfileChangeInfoForm: React.FC<PropsType> = (props) => {

    return <div>
        <form onSubmit={props.handleSubmit}>
            {props.error && <Error string={props.error}/>}
            <div>
                Full Name: <Field name={"fullName"} component={Inputmine} placeholder={"Full name"}/>
            </div>
            <div>
                About me: <Field name={"aboutMe"} component={Inputmine} placeholder={"Something about you"}/>
            </div>
            <div>
                In job searching: <Field name={"lookingForAJob"} component="input" type={"checkbox"}/>
            </div>
            <div>
                Looking for a job description: <Field name={"lookingForAJobDescription"} component={Inputmine}
                                                      placeholder={"Description"}/>
            </div>
            <div>Contacts:
            <div>
                <div>facebook: <Field name={"contacts.facebook"} component={Inputmine} placeholder={"http//:facebook.com"}/></div>
                <div>github: <Field name={"contacts.github"} component={Inputmine} placeholder={"github"}/></div>
                <div>instagram: <Field name={"contacts.instagram"} component={Inputmine} placeholder={"instagram"}/></div>
                <div>mainLink: <Field name={"contacts.mainLink"} component={Inputmine} placeholder={"mainlink"}/></div>
                <div>twitter: <Field name={"contacts.twitter"} component={Inputmine} placeholder={"twitter"}/></div>
                <div>vk: <Field name={"contacts.vk"} component={Inputmine} placeholder={"vk"}/></div>
                <div>website: <Field name={"contacts.website"} component={Inputmine} placeholder={"website"}/></div>
                <div>youtube:<Field name={"contacts.youtube"} component={Inputmine} placeholder={"youtube"}/> </div>
            </div>

            </div>
            <button>Submit</button>
        </form>

    </div>
}
const ProfileChangeInfoFormWithProps = reduxForm<{}, PropsType>({form: "profileInfoForm"})(ProfileChangeInfoForm);
export default ProfileChangeInfoFormWithProps;

