import React, { Component } from 'react'

export class UpdateNews extends Component {
  render() {
    let  {mytitle,desc,imgUrl,newsUrl,author,date}=this.props;
    return (
      <div>
        <div className="card" >
  <img src={imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{mytitle}</h5>
    <p className="card-text">{desc}</p>
     <p class="card-text"><small class="text-body-secondary">By {author} on  {date}</small></p>
    <a href={newsUrl} className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default UpdateNews
