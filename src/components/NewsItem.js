import React, { Component } from 'react'

const NewsItem= (props)=> {

    let {title,description,imageurl,newsurl,date,author,source} = props;
    return (
      <div className='my-3'>
           <div className="card" style={{width: "18rem"}}>
           <span class="  badge rounded-pill text-bg-danger" >{source}</span>
        <img src={imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"> <small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsurl } target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
      </div>
    )
  }

  export default NewsItem
 