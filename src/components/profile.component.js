// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";
import Loader from './loader.component';

const Auth = new AuthHelperMethods();

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userName: '',
            userEmail: '',
            timeZone: '',
            loader: true
        }
    }
    componentDidMount() {
        let config_header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Auth.getToken(),
            }
        }
        axios.get(config.API_BASE_URL+'user/'+Auth.getUserId()+'?_format=json', config_header)
            .then(response => {
                this.setState({
                    loader: false
                });
                this.setState({ 
                    userId: response.data.uid[0].value,
                    userName: response.data.name[0].value, 
                    userEmail: response.data.mail[0].value, 
                    timeZone: response.data.timezone[0].value,  
                }); 
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    render() {
        if(this.state.loader === true){
            return <Loader/>
        }
        return (
            <div style={{marginTop: 10}}>
                <h3 align="conter">Welcome, {Auth.getUser()}</h3>
                <form >
                    <div className="form-group">
                        <label>User Id:  </label>
                        <input type="text" className="form-control"   value={this.state.userId} disabled/>
                    </div>
                    <div className="form-group">
                        <label>User Name: </label>
                        <input type="text" className="form-control"   value={this.state.userName} disabled/>
                    </div>
                    <div className="form-group">
                        <label>User Email: </label>
                        <input type="text" className="form-control"   value={this.state.userEmail} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Timezone: </label>
                        <input type="text" className="form-control"   value={this.state.timeZone} disabled/>
                    </div>
                </form>
            </div>
        )
    }
}
export default Profile