// create.component.js

import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";
import Loader from './loader.component';

const Auth = new AuthHelperMethods();

class Create extends Component {
    constructor(props) {
        super(props)
        this.onChangeArticle = this.onChangeArticle.bind(this);
        this.onChangeArticleBody = this.onChangeArticleBody.bind(this);
        this.onChangeArticleImage = this.onChangeArticleImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            article_title: '',
            article_body: '',
            article_image: '',
            article_target_image_id: '',
            error: '',
            loader: false,
            success_msg: false 
        }
    }
    onChangeArticle(e) {
        this.setState({
            article_title: e.target.value,
        })
    }
    onChangeArticleBody(e) {
        this.setState({
            article_body: e.target.value,
        })
    }
    onChangeArticleImage(e) {
        this.setState({
            article_image: e.target.files[0],
        })
    }
    uploadArticleImage() {
        let config_header_file = {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': 'Bearer '+Auth.getToken(),
                'Content-Disposition': 'file; filename="' + this.state.article_image.name + '"'
                //'X-CSRF-Token': 'drW-ozUVkMAroWqk5iqd3aoazC2wYnmKp3TP66jIyRY',
                //'Authorization': 'Basic YWRtaW46YWRtaW4=',
               
            }
        }

        const formData = this.state.article_image;
        return axios.post(config.API_BASE_URL+'file/upload/node/article/field_image?_format=json', formData, config_header_file)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    this.setState({
                        article_target_image_id: res.data.fid[0].value
                    })
                }
            }

            );
    }
    creatNodeArticle() {
        let config_header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Auth.getToken(),
                //'X-CSRF-Token': 'drW-ozUVkMAroWqk5iqd3aoazC2wYnmKp3TP66jIyRY',
                //'Authorization': 'Basic YWRtaW46YWRtaW4=',
                //'Accept': 'application/json'
            }
        }
        let fieldImgObj = {};
        if (this.state.article_target_image_id) {
            fieldImgObj = {
                "field_image": [
                    {
                        "target_id": this.state.article_target_image_id,
                        "description": "The most fascinating image ever!"
                    }
                ]
            }
        }

        let articleObj = {
            "type": [
                {
                    "target_id": "article"
                }
            ]
            ,
            "title": [
                {
                    "value": this.state.article_title,
                }
            ],
            "body": [
                {
                    "value": this.state.article_body,
                }
            ],
        };
        const article = Object.assign(articleObj, fieldImgObj);
        axios.post(config.API_BASE_URL+'node?_format=json', article, config_header)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    //this.fileInput.value = "";
                    this.setState({
                        article_title: '',
                        article_body: '',
                        article_image: '',
                        article_target_image_id: '',
                        error: '',
                        loader: false,
                        success_msg: true
                       
                    })
                }

            });

    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            loader: true
        })
        if(this.state.article_title && this.state.article_body){
            if (this.state.article_image) {
                this.uploadArticleImage()
                    .then((returnVal) => {
                        this.creatNodeArticle();
                    })
            } else {
                this.creatNodeArticle();
            }
        } else {
            this.setState({
                error: 'Please enter title and body',
                loader: false
            })
        }
        
    }
    render() {
        if(this.state.loader === true){
            return <Loader/>
        }
        return (
            <div style={{ marginTop: 10 }}>
                <div style={{ color: 'red', textAlign:'center' }}><span>{this.state.error}</span></div>
                { this.state.success_msg ? <div style={{ color: 'green', textAlign:'center' }}><span >Article created successfully.</span></div> : ''}
                <h3>Add New Article</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><span style={{ color: 'red' }}>*</span>Article Title:  </label>
                        <input type="text" className="form-control" onChange={this.onChangeArticle} value={this.state.article_title} />
                    </div>
                    <div className="form-group">
                        <label><span style={{ color: 'red' }}>*</span>Article Body: </label>
                        <textarea className="form-control" name="article_body" onChange={this.onChangeArticleBody} value={this.state.article_body}></textarea>
                    </div>
                    <div className="form-group">
                        <input type="file" name="file" className="form-control" onChange={this.onChangeArticleImage} ref={(ref) => this.fileInput= ref}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Article" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default Create