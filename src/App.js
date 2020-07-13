import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initalizedThunk} from "./redux/appReducer";
import Loader from "./components/common/loadingProgress/loading";
import {compose} from "redux";


class App extends React.Component {
    componentDidMount() {
        this.props.initalizedThunk();

    }

    render() {
        if(!this.props.initialized) {
            return <Loader />
        }

        return (

                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Nav/>

                    <div className="app__wrapper__contern">
                        <Route path="/Dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/Profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/Users" render={() => <UsersContainer/>}/>
                        <Route path="/Music" component={Music}/>
                        <Route path="/News" component={News}/>
                        <Route path="/Settings" component={Settings}/>
                        <Route path="/Login" render={() => <Login/>}/>
                    </div>


                </div>
            );
    }
}

let mapDispathToProps = (state) => ({
    initialized: state.app.initalized
})

export default compose(
    withRouter,
    connect(mapDispathToProps,{initalizedThunk})
)(App);
