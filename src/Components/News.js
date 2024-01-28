import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=>{
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);
  const capitalizeFirstLetter=(string)=>
  {
    return string.charAt(0).toUpperCase()+string.slice(1);
  };
  const updateNews=async ()=>{
    props.setProgress(0);
    setLoading(true);
    let url=`https://newsapi.org/v2/top-headlines?&page=${page}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&category=${props.category}&country=${props.country}`;
    let data=await fetch(url);
    props.setProgress(50);
    let parsedData=await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])
  // const componentDidMount=async()=>{
  //   console.log("update");
  //   this.updateNews();
  // }
  const handlePrevClick=async()=>{
  //   this.setState({page: this.state.page-1});
  setPage(page-1);
  this.updateNews();
  }
  const handleNextClick=async()=>{
    setPage(page+1);
    this.updateNews();
  }

  const fetchMoreData = async() =>{
    // if(this.state.page+1>Math.ceil(this.state.totalResults/(props.pageSize)))
    // {
    //   this.setState({loading: false});
    //   return false;
    // }
    props.setProgress(0);
    setPage(page+1);
    let url=`https://newsapi.org/v2/top-headlines?&page=${page}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&category=${props.category}&country=${props.country}`;
    setLoading(true);
    console.log(page);
    let data=await fetch(url);
    props.setProgress(50);
    let parsedData=await data.json();
    console.log("more data");
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
    console.log("articles: "+articles.length);
  }
  
    return (
      <div className="container my-4 bg-secondary">
        <h1 className="text-center text-white" style={{margin: "35px 0px"}}>Daily News - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner></Spinner>}
        {!loading &&
        <>
        <p className="text-white">Articles available: {totalResults}. </p>
        {/* Page {this.state.page} out of {Math.ceil(this.state.totalResults/(props.pageSize))}.</p>
        <p>{props.pageSize} Records per Page.</p> */}
        {/* <div class="d-flex justify-content-between">
          <button disabled={this.state.page<=1}
          type="button" class="btn btn-secondary" onClick={this.handlePrevClick}>Prev &#8592;</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(props.pageSize))} type="button" class="btn btn-secondary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> */}
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={articles!==totalResults}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You have seen all the articles. Stay tuned to Daily News for the latest updates.</b>
            </p>
          }
        >
        <div className="container">
          <div className="row">
          {articles.map((element)=>{
            return (
                <div className="col-md-3 mx-4 my-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    desc={element.description ? element.description : ""}
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
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(props.pageSize))} type="button" class="btn btn-secondary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> */}
      </>
      }
      </div>
    );
};
News.defaultProps={
  country: "in",
  pageSize: 15,
  category: "general",
  query: "",
  apiKey: "0c00285904694c64b64136af0de939fb"
};
News.propTypes={
  country: PropTypes.string,
  page: PropTypes.number,
  category: PropTypes.string
};
export default News;
