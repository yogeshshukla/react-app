import axios from 'axios';
import config from './config';

export default class AuthHelperMethods {
    
    login (username, password) {
        let config_header = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        let formData = new FormData();    //formdata object
        formData.append('grant_type', config.GRANT_TYPE);   //append the values with key, value pair
        formData.append('client_id', config.CLIENT_ID);
        formData.append('client_secret', config.CLIENT_SECRET);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('scope', config.SCOPE);
        return axios.post(config.API_BASE_URL+'oauth/token', formData, config_header)
    };
    setToken(idToken, expiry_time, userId, userName){
        console.log(idToken);
        // Saves user token to localStorage
       localStorage.setItem("id_token", idToken);
       localStorage.setItem("user_id", userId);
       localStorage.setItem("user_name", userName);
       let expiry_t = ( Date.now() / 1000 ) + expiry_time;
       localStorage.setItem("token_expiry", expiry_t);
    }
    getToken () {
           // Retrieves the user token from localStorage
           return localStorage.getItem("id_token");
    };
  
    loggedIn () {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken(); // Getting token from localstorage
      //return !!token; // handwaiving here
      return !!token && !this.isTokenExpired(token); // handwaiving here
    };
    getUser () {
      return localStorage.getItem("user_name");
    };
    getUserId () {
      return localStorage.getItem("user_id");
    };
    logout = () => {
      // Clear user token and profile data from localStorage
      localStorage.removeItem("id_token");
      localStorage.removeItem("token_expiry");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
    };
    
  
    isTokenExpired = token => {
      try {
        //const decoded = decode(token);
        const exp =  localStorage.getItem("token_expiry");
        console.log(exp);
        console.log(Date.now() / 1000);
        if (exp < Date.now() / 1000) {
          // Checking if token is expired.
          return true;
        } else return false;
      } catch (err) {
        console.log("expired check failed! Line 42: AuthService.js");
        return false;
      }
    };
  
    
  }
  