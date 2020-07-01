import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";


const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>

                <div className="app__wrapper__contern">
                    <Route path="/Dialogs" render={() => <DialogsContainer />}/>
                    <Route path="/Profile/:userId?" render={() => <ProfileContainer />} />
                    <Route path="/Users" render={() => <UsersContainer />} />
                    <Route path="/Music" component={Music}/>
                    <Route path="/News" component={News}/>
                    <Route path="/Settings" component={Settings}/>
                    <Route path="/Login" render={() => <Login />} />
                </div>


            </div>
        </BrowserRouter>);
}


export default App;
