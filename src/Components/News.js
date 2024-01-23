import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  articles=[];
  static defaultProps={
    country: "in",
    pageSize: 9,
    category: "general",
    query: "",
    apiKey: "0c00285904694c64b64136af0de939fb"
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
    this.props.setProgress(0);
    this.setState({loading: true});
    let url=`https://newsapi.org/v2/top-headlines?&page=${this.state.page}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&category=${this.props.category}&country=${this.props.country}`;
    this.props.setProgress(50);
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }
  async componentDidMount(){
    console.log("update");
    this.updateNews();
  }
  // handlePrevClick=async()=>{
  //   this.setState({page: this.state.page-1});
  //   this.updateNews();
  // }

  fetchMoreData = async() =>{
    // if(this.state.page+1>Math.ceil(this.state.totalResults/(this.props.pageSize)))
    // {
    //   this.setState({loading: false});
    //   return false;
    // }
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?&page=${this.state.page+1}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&category=${this.props.category}&country=${this.props.country}`;
    this.setState({page: this.state.page+1});
    this.setState({loading: true});
    console.log(this.state.page);
    let data=await fetch(url);
    this.props.setProgress(50);
    let parsedData=await data.json();
    console.log("more data");
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
    console.log("articles: "+this.state.articles.length);
  }

  // handleNextClick=async()=>{
  //   this.setState({
  //     page: this.state.page+1,
  //     articles: this.state.articles.concat(this.parsedData.articles)
  //   });
  //   this.updateNews();
  // }
  
  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{margin: "35px 0px"}}>Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        {!this.state.loading &&
        <>
        <p>Articles available: {this.state.totalResults}. </p>
        {/* Page {this.state.page} out of {Math.ceil(this.state.totalResults/(this.props.pageSize))}.</p>
        <p>{this.props.pageSize} Records per Page.</p> */}
        {/* <div class="d-flex justify-content-between">
          <button disabled={this.state.page<=1}
          type="button" class="btn btn-secondary" onClick={this.handlePrevClick}>Prev &#8592;</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(this.props.pageSize))} type="button" class="btn btn-secondary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> */}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.articles!==this.state.totalResults}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You have seen all the articles. Stay tuned to Daily News for the latest updates.</b>
            </p>
          }
        >
        <div className="container">
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
        </div>
        </InfiniteScroll>
        {/* <div class="d-flex justify-content-between">
          <button disabled={this.state.page<=1}
          type="button" class="btn btn-secondary" onClick={this.handlePrevClick}>Prev &#8592;</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(this.props.pageSize))} type="button" class="btn btn-secondary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> */}
      </>
      }
      </div>
    )
  }
}
export default News
