import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../redux/reduxStore";



let mapStateToProps = (state: StateType) => {
    return {
        auth: state.auth.isAutorized
    }
}
type MapStateType = {
    auth: boolean
}
type MapDispatchType = {

}

type RedirectType = {
    auth: boolean
}
export const withAuthRedirect = <P extends object>(Component: React.FC<MapStateType & RedirectType>) => {

    class RedirectComponent extends React.Component<MapStateType & RedirectType> {
        render() {
            if(!this.props.auth) return <Redirect to="/Login"/>
            return <Component {...this.props} />
        }
    }

    let withPropsRedirect = connect<MapStateType, MapDispatchType, RedirectType, StateType>(mapStateToProps)(RedirectComponent)

    return withPropsRedirect;
}
