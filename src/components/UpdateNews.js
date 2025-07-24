import React, { Component } from 'react'

export class UpdateNews extends Component {
  render() {
    let  {mytitle,desc,imgUrl,newsUrl}=this.props;
    return (
      <div>
        <div class="card" style={{width: '18rem'}}>
  <img src={imgUrl} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{mytitle}</h5>
    <p class="card-text">{desc}</p>
    <a href={newsUrl} class="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default UpdateNews
