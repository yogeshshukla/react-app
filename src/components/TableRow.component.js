import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";

const Auth = new AuthHelperMethods();

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        let config_header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Auth.getToken(),
                //'X-CSRF-Token': 'drW-ozUVkMAroWqk5iqd3aoazC2wYnmKp3TP66jIyRY',
                //'Authorization': 'Basic YWRtaW46YWRtaW4=',
            }
        }
        axios.delete(config.API_BASE_URL+'node/'+this.props.obj.nid+'?_format=json', config_header)
            .then(res => 
              this.props.parentMethod.deleteArticle(this.props.index)
              )
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td dangerouslySetInnerHTML={{__html: this.props.obj.title}} />
          <td dangerouslySetInnerHTML={{__html: this.props.obj.body}} />
          <td>
            <Link to={"/edit/"+this.props.obj.nid} className="btn btn-primary">Edit</Link>
          </td>
          <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;