import React, { Component } from 'react'

export class UpdateNews extends Component {
  render() {
    let  {mytitle,desc,imgUrl,newsUrl,author,date}=this.props;
    return (
      <div>
        <div className="card" >
  {imgUrl && (
  <img
    src={imgUrl}
    className="card-img-top"
    alt="news"
    style={{ height: "200px", objectFit: "cover" }}
  />
)}
  <div className="card-body">
    <h5 className="card-title">{this.mytitle}</h5>
    <p className="card-text">{this.desc}</p>
     <p className="card-text"><small className="text-body-secondary">By {author} on  {date}</small></p>
    <a href={newsUrl} className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default UpdateNews
