// create.component.js

import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";
import { withRouter } from 'react-router-dom'
import Loader from './loader.component';

class Login extends Component {
    constructor(props) {
        super(props)
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            error: '',
            loader: false
        }
        
    }
    onChangeUser(e) {
        this.setState({
            username: e.target.value,
        })
    }
    onChangePass(e) {
        this.setState({
            password: e.target.value,
        })
    }
    userLogin() {
        const Auth = new AuthHelperMethods();
        Auth.login(this.state.username, this.state.password)
            .then(res => {
                this.setState({
                    loader: false,
                }) 
                console.log(res);
                Auth.setToken(res.data.access_token, res.data.expires_in, res.data.user_id, res.data.user);
                window.location = "/index";
                //this.props.history.push('/index');
            })
            .catch(err => {
                this.setState({
                    error: 'Incorrect username or password',
                    loader: false,
                }) 
            });
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            loader: true,
        })
        if(this.state.username && this.state.password){
            this.userLogin();
        } else {
            this.setState({
                error: 'Please enter Username and password',
            })
        }
        
    }
    render() {
        if(this.state.loader === true){
            return <Loader/>
        }
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Login</h3>
                <span style={{ color: 'red' }}>{this.state.error}</span>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><span style={{ color: 'red' }}>*</span>User Name:  </label>
                        <input type="text" className="form-control" onChange={this.onChangeUser} value={this.state.username} />
                    </div>
                    <div className="form-group">
                        <label><span style={{ color: 'red' }}>*</span>Password:  </label>
                        <input type="password" className="form-control" onChange={this.onChangePass} value={this.state.password} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(Login)