import React, { Component } from 'react'


export class NewsItem extends Component {
    
    
  render() {
    let {title,description,imageurl,newsurl,author,date}=this.props;
    return (
            <div>
            <div className="card mx-5 my-5"  >
            <img src={imageurl} alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}....</p>
                <p className="card-text"><small className="text-body-secondary">By {!author?"Unknow":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsurl} target="_blank" rel="noreferrer noopener" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
            </div>
    )
  }
}

export default NewsItem
