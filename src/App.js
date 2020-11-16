import React from 'react';
import './App.css';
import Nav from "./components/Navbar/Navbar";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initalizedThunk} from "./redux/appReducer";
import {compose} from "redux";
import FriendsContainer from "./components/friends/FriendsContainer";
import SearchContainerConnected from "./components/Search/SearchContainer";


class App extends React.Component {
    componentDidMount() {
       // this.props.initalizedThunk();
    }

    render() {
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>

                <div className="app__wrapper__contern">
                    <Switch>
                        <Route exact path={"/"} render={() => <Redirect to={"/Profile"} />} />
                        <Route path="/Dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/Profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/Users" render={() => <UsersContainer/>}/>
                        <Route path="/Search" render={() => <SearchContainerConnected/>}/>
                        <Route path="/Friends" component={FriendsContainer}/>
                        <Route path="/News" component={News}/>
                        <Route path="/Settings" component={Settings}/>
                        <Route path="/Login" render={() => <Login/>}/>
                    </Switch>
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
    connect(mapDispathToProps, {initalizedThunk})
)(App);
