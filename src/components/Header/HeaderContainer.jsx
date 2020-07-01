import React from "react";
import classes from "./Header.module.css";
import Header from "./Header";
import {autorize, AutorizedThunk} from "../../redux/autorReducer";
import * as axios from "axios";
import {connect} from "react-redux";
import {DataAPI} from "../../api/api";


class HeaderContainer extends React.Component {

    componentDidMount() {
    this.props.AutorizedThunk();
    }

    render() {
        return  <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    isAutorized: state.auth.isAutorized,
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
    isFetching: state.auth.isFetching
});


export default connect(mapStateToProps, {AutorizedThunk})(HeaderContainer);