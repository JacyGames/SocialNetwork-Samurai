import React from "react";
import classes from "./Header.module.css";
import Header from "./Header";
import {autorize, AutorizedThunk, LogOut} from "../../redux/autorReducer";
import {connect} from "react-redux";
import {getAuthEmail, getAuthLogin, getIsAutorized, getIsFetching, getLoginedId} from "../../redux/selectors/Selector";



class HeaderContainer extends React.Component {

    componentDidMount() {
    this.props.AutorizedThunk();
    }

    render() {
        return  <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    isAutorized: getIsAutorized(state),
    id: getLoginedId(state),
    login: getAuthLogin(state),
    email: getAuthEmail(state),
    isFetching: getIsFetching(state)
});


export default connect(mapStateToProps, {AutorizedThunk, LogOut})(HeaderContainer);