import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  articles=[];
  static defaultProps={
    country: "in",
    pageSize: 9,
    category: "general",
    query: "",
    apiKey: "a0e372382be94ea492277dc9bfdddcd2"
  };
  PropTypes={
    country: PropTypes.string,
    page: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props){
    super(props);
    console.log("inside news constructor");
    this.state= {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: this.articles.entries
    }
    document.title="Daily News - "+this.capitalizeFirstLetter(this.props.category);
  }
  capitalizeFirstLetter=(string)=>
  {
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  async updateNews(){
    this.setState({loading: true});
    let url=`https://newsapi.org/v2/top-headlines?&page=${this.state.page}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&category=${this.props.category}&country=${this.props.country}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log("prev");
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }
  async componentDidMount(){
    this.updateNews();
  }
  handlePrevClick=async()=>{
    this.setState({page: this.state.page-1});
    this.updateNews();
  
  }

  handleNextClick=async()=>{
    this.setState({page: this.state.page+1});
    this.updateNews();
  }
  
  render() {
    return (
      <div className="container">
        <h1 className="text-center" style={{margin: "35px 0px"}}>Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        {!this.state.loading &&
        <>
        <p>Articles available: {this.state.totalResults}. 
        Page {this.state.page} out of {Math.ceil(this.state.totalResults/(this.props.pageSize))}.</p>
        <p>{this.props.pageSize} Records per Page.</p>
        <div class="d-flex justify-content-between">
          <button disabled={this.state.page<=1}
          type="button" class="btn btn-secondary" onClick={this.handlePrevClick}>Prev &#8592;</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(this.props.pageSize))} type="button" class="btn btn-secondary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div>
        <div className="row">
        {this.state.articles.map((element)=>{
          return (
              <div className="col-md-3 mx-4 my-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  desc={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
          );
        } ) }
        </div>
        <div class="d-flex justify-content-between">
        <button disabled={this.state.page<=1}
        type="button" class="btn btn-secondary" onClick={this.handlePrevClick}>Prev &#8592;</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(this.props.pageSize))} type="button" class="btn btn-secondary" onClick={this.handleNextClick}>Next &#8594;</button>
      </div>
      </>
      }
      </div>
    )
  }
}
export default News
