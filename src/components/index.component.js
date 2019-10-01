import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow.component';
import config from '../config';
import AuthHelperMethods from "../AuthHelperMethods";
import Pagination from "react-js-pagination";
import Loader from './loader.component';
const Auth = new AuthHelperMethods();
class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {
        articles: [],
        limit: 5,
        page : 1,
        totalCount: 0,
        paginate: false,
        Auth: Auth.loggedIn(),
        pageSize: 0,
        currentPage: 0,
        activePage: 1,
        loader: true
      };
      this.deleteArticle = this.deleteArticle.bind(this);
      this.onChangePage = this.onChangePage.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
    
    }
    handlePageChange(pageNumber) {
      this.setState({activePage: pageNumber});
      this.articleListing(pageNumber-1);
    }
    articleListing(page){
      this.setState({ 
        loader: true
      })
      var page_number = '';
      if (typeof page !== 'undefined') {
         page_number = '&page='+page;
      }
      let config_header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+Auth.getToken(),
        }
      } 
      return axios.get(config.API_BASE_URL+'latest/article?_format=json&items_per_page='+this.state.limit+''+page_number, config_header)
        .then(response => {
          this.setState({ articles: response.data.results, pageSize: response.data.pager.pages, currentPage: response.data.pager.current_page, totalCount: response.data.pager.count,  loader: false});
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    onChangePage(page) {
      console.log(page);
      this.articleListing(page-1);
      this.setState({ page: page });
    }
    deleteArticle(index) {
      this.articleListing();
    }
    
    componentDidMount(){
      this.articleListing(this.state.currentPage)
        .then((returnVal) => {
          this.setState({ 
            paginate: true,
            loader: false
          })
        })
    }
    tabRow(){
      return this.state.articles.map(function(object, i){
          return <TableRow parentMethod={this} obj={object} key={i} index={i} />;
      }, this);
    }
    
    render() {
      if(this.state.loader === false){
        return (
            <div>
              <h3 align="center">Articles</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Body</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  { this.tabRow() }
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
              {/* { this.state.paginate ? <Pagination items={this.state.articles} pageSize={this.state.pageSize} currentPage={this.state.currentPage} itemCount={this.state.totalCount} onChangePage={this.onChangePage} /> : "" } */}
              { this.state.paginate ?
              <Pagination
              itemClass={'page-item'}
              linkClass={'page-link'}
              activePage={this.state.activePage}
              itemsCountPerPage={5}
              totalItemsCount={this.state.totalCount}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
            : "" }
              </nav>
            </div>
        );
      } else {
        return <Loader/>
      }
      
    }
  }

  export default Index