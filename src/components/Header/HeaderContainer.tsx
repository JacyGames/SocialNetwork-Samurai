import React from "react";
import Header from "./Header";
import {AutorizedThunk, LogOut} from "../../redux/autorReducer";
import {connect} from "react-redux";
import {getAuthEmail, getAuthLogin, getIsAutorized, getLoginedId} from "../../redux/selectors/Selector";
import {StateType} from "../../redux/reduxStore";

type PropsTypeOwn = {
    AutorizedThunk: () => void
}
type MapStateType = {
    isAutorized: boolean,
    id: number | null,
    login: string | null,
    email: string | null,
}
type MapDispatchType = {
    AutorizedThunk: () => void
    LogOut: () => void
}


class HeaderContainer extends React.Component<PropsTypeOwn & MapStateType & MapDispatchType> {

    componentDidMount() {
        //this.props.AutorizedThunk();
    }

    render() {
        return <Header login={this.props.login} isAutorized={this.props.isAutorized} LogOut={this.props.LogOut}/>
    }
}

let mapStateToProps = (state: StateType): MapStateType => ({
    isAutorized: getIsAutorized(state),
    id: getLoginedId(state),
    login: getAuthLogin(state),
    email: getAuthEmail(state),
});


export default connect(mapStateToProps, {AutorizedThunk, LogOut})(HeaderContainer);
