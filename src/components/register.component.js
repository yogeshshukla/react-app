// create.component.js

import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";

const Auth = new AuthHelperMethods();
class Register extends Component {
    constructor(props) {
        super(props)
        this.onChangeField = this.onChangeField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }
    onChangeField(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    creatUser() {
        let userObj = {
            "name": [
                {
                    "value": this.state.name,
                }
            ],
            "mail": [
                {
                    "value": this.state.email,
                }
            ],
            "pass": [
                {
                    "value": this.state.pass,
                }
            ],
        };
        axios.post(config.API_BASE_URL+'user/register?_format=json', userObj)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        name: '',
                        email: '',
                        pass: '',
                        error: ''
                    })
                    this.props.history.push('/login');
                }

            });

    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.name && this.state.email && this.state.pass){
            this.creatUser();
            
        } else {
            this.setState({
                error: 'Please enter Username and Password',
            })
        }
        
    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Registration</h3>
                <span style={{ color: 'red' }}>{this.state.error}</span>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><span style={{ color: 'red' }}>*</span>Name:  </label>
                        <input type="text" name="name" className="form-control" onChange={this.onChangeField} value={this.state.name} />
                    </div>
                    <div className="form-group">
                        <label><span style={{ color: 'red' }}>*</span>Email: </label>
                        <input type="text" name="email" className="form-control" onChange={this.onChangeField} value={this.state.email} />
                    </div>
                    <div className="form-group">
                        <label><span style={{ color: 'red' }}>*</span>Password: </label>
                        <input type="password" name="pass" className="form-control" onChange={this.onChangeField} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default Register