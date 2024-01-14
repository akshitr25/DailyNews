import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, desc, imgUrl, newsUrl, author, date, source}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
        <a href={newsUrl?newsUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} target="_blank" rel="noreferrer">
          <img src={imgUrl?imgUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} className="card-img-top" alt={title}/>
          </a>
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-info" style={{right: '0%', zIndex: "1"}}> 
    {author}
  </span>
  <div className="card-body">
  <h5 className="card-title flex">
    <a href={newsUrl?newsUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} target="_blank" rel="noreferrer">{title}</a>
  </h5>
    <p className="card-text">{desc}</p>
    <a href={newsUrl?newsUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} target="_blank" className="btn btn-primary" rel="noreferrer">Read More...</a>
    <p class="card-text"><small class="text-muted">By {author!=null?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
  </div>
</div>
      </div>
    )
  }
}
