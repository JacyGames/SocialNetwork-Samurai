import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../redux/reduxStore";
import {getIsFetching} from "../redux/selectors/Selector";
import Loader from "../components/common/loadingProgress/loading";



let mapStateToProps = (state: StateType) => {
    return {
        auth: state.auth.isAutorized,
        isFetching: getIsFetching(state),
    }
}
type MapStateType = {
    auth: boolean
    isFetching: boolean
}
type MapDispatchType = {

}

type RedirectType = {
    auth: boolean
}
export const withAuthRedirect = <P extends object>(Component: React.FC<MapStateType & RedirectType>) => {

    class RedirectComponent extends React.Component<MapStateType & RedirectType> {
        render() {
            if(this.props.isFetching) return <Loader />
            if(!this.props.auth) return <Redirect to="/Login"/>
            return <Component {...this.props} />
        }
    }
    return connect<MapStateType, MapDispatchType, RedirectType, StateType>(mapStateToProps)(RedirectComponent)
}
