import React, {createRef} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Inputmine} from "../common/CustomHTML/ValidateInput";
import {maxlenght} from "../common/validation/validator";

type Props = {
    isFetching: boolean
}
type SubmitForm = {
    searchInput: string
}
const maxLength = maxlenght(15);

const Search: React.FC<Props & InjectedFormProps<SubmitForm, Props>> = (props) => {
   let referral: React.RefObject<any> = React.createRef();

    return <div>
        <h1>SEARCH COMPONENT</h1>
        <div>
            <form onSubmit={props.handleSubmit}>
                <Field onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        referral.current.click();
                    }
                }} component={Inputmine} validate={[maxLength]} name={"searchInput"} placeholder={"Search"}/>

                <button disabled={props.isFetching} ref={referral} type={"submit"}>submit</button>
            </form>

        </div>
    </div>
}
const SearchReduxForm = reduxForm<SubmitForm, Props>({form: "searchInput"})(Search);

export default SearchReduxForm;
