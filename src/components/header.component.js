import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const Auth = new AuthHelperMethods();
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Auth: Auth.loggedIn()
        };
        
    }
    render() {

        return (
            <div className="container">
                { this.state.Auth ? (
                    <Link to={'/logout'} className="nav-link">Logout</Link>
                ) : (
                    <Link to={'/login'} className="nav-link">Login</Link>
                )
                }
            </div>
        );
    }
}
export default Header