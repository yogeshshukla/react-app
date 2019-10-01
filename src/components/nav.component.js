import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthHelperMethods from "../AuthHelperMethods";

const Auth = new AuthHelperMethods();
class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
          Auth: Auth.loggedIn()
        };
    }
    logOut(e) {
        e.preventDefault()
        Auth.logout();
        this.setState({ 
            Auth: Auth.loggedIn()
        });
        this.props.history.push(`/login`)
    }
    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
        )
      
        const userLink = (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Hi, {Auth.getUser()}
                </Link>
              </li>
              <li className="nav-item">
                <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
        )
        
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample10"
                aria-controls="navbarsExample10"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
      
              <div
                className="collapse navbar-collapse justify-content-md-center"
                id="navbarsExample10"
              >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                        Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/create'} className="nav-link">Create</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/index'} className="nav-link">Articles</Link>
                    </li>
                </ul>
                {this.state.Auth ? userLink : loginRegLink}
              </div>
            </nav>
        )
    }
}
export default withRouter(Nav)