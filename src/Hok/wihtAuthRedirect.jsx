import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";



let mapStateToProps = (state) => {
    return {
        auth: state.auth.isAutorized
    }
}

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.auth) return <Redirect to="/Login"/>
            return <Component {...this.props} />
        }
    }

    let withPropsRedirect = connect(mapStateToProps)(RedirectComponent)

    return withPropsRedirect;
}