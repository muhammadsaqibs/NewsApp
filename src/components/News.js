import React, { Component } from 'react'
import UpdateNews from './UpdateNews'

export class News extends Component {
  render() {
    return (
      <div>
       <UpdateNews mytitle="this is my news" desc="this is my description of news" imgUrl="https://s3.crackedcdn.com/phpimages/article/3/8/2/1327382.jpg"/> 
      </div>
    )
  }
}

export default News
