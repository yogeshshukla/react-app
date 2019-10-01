// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";
import Loader from './loader.component';

const Auth = new AuthHelperMethods();

class Edit extends Component {
    constructor(props) {
        super(props)
        this.onChangeArticle = this.onChangeArticle.bind(this);
        this.onChangeArticleBody = this.onChangeArticleBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            article_title: '',
            article_body: '',
            loader: false
        }
    }
    componentDidMount() {
        axios.get(config.API_BASE_URL+'node/'+this.props.match.params.id+'?_format=json')
            .then(response => {
                this.setState({ 
                    article_title: response.data.title[0].value, 
                    article_body: response.data.body[0].value,
                   });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeArticle(e){
         this.setState({
             article_title: e.target.value,
         })
    }
    onChangeArticleBody(e){
        this.setState({
            article_body: e.target.value,
        })
    }
    onSubmit(e){
        e.preventDefault();
        this.setState({
            loader: true
        })
        let config_header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Auth.getToken(),
                //'Authorization': 'Basic YWRtaW46YWRtaW4=',
                //'X-CSRF-Token': 'drW-ozUVkMAroWqk5iqd3aoazC2wYnmKp3TP66jIyRY',
                
            }
        }
          
        const article = {
            "type": [
                {
                    "target_id": "article"
                }
            ]
            ,
            "title": [
                {
                    "value":this.state.article_title,
                }
            ],
            "body": [
                {
                    "value":this.state.article_body,
                }
            ]
          };
          axios.patch(config.API_BASE_URL+'node/'+this.props.match.params.id+'?_format=json', article, config_header)
            .then( (res) => {
                if(res.status === 200){
                    this.setState({
                        loader: false
                    })
                    this.props.history.push('/index')        
                    
                    }
                }
                
            );    
            
        
    }
    render() {
        if(this.state.loader === true){
            return <Loader/>
        }
        return (
            <div style={{marginTop: 10}}>
                <h3>Edit Article</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Article Title:  </label>
                        <input type="text" className="form-control"  onChange={this.onChangeArticle} value={this.state.article_title}/>
                    </div>
                    <div className="form-group">
                        <label>Article Body: </label>
                        <textarea className="form-control"  onChange={this.onChangeArticleBody} value={this.state.article_body}></textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Article" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
export default Edit