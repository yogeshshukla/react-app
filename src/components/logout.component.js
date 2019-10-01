import React, { Component } from 'react';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";

const Auth = new AuthHelperMethods();
class Logout extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        Auth.logout();
        this.props.history.push('/login');
    }

    render() {
        return null;
    }
}
export default Logout