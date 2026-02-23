// This file contains an older, commented-out class-based News component.
// Hard-coded API keys and endpoints were removed for security.
// If you need the old class-based example, re-implement it and
// provide the API key via environment variables (do not hard-code).

// import React, { Component } from 'react'
// import UpdateNews from './UpdateNews'
// import InfiniteScroll from 'react-infinite-scroll-component';
// export class News extends Component {
//   async componentDidMount(){
//     const {page}=this.state;
//     // Example (do not hard-code keys):
//     // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=<REMOVED>&page=${page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
//     this.setState({loading:true});
//     let data= await fetch(url);
//     let parsedData= await data.json();
//     this.setState({articles:parsedData.articles,totalResults: parsedData.totalResults ,loading:false});
//   }
//   // ... rest of the class-based implementation omitted
// }

// export default News
