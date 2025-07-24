import React, { Component } from 'react'
import UpdateNews from './UpdateNews'

export class News extends Component {

    async componentDidMount(){   //build in lifecycle method
      console.log("this is function");
       let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b019a4ee096a497c9d46d0fb3db8a947&page=${this.state.page}&pageSize=10`;

  
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({articles:parsedData.articles,totalResults: parsedData.totalResults });
    }
  constructor(){
      super();
       this.state={
        articles:[],   //make empty
        loading:false,
        page:1,
        totalResults:0
      }
    }
   HandlePRevious= async ()=> {
    let newPage=this.state.page-1;
           
    let url=`https://newsapi.org/v2/top-headlines?&country=us&apiKey=b019a4ee096a497c9d46d0fb3db8a947&page=${newPage}&pageSize=10`
  
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({articles:parsedData.articles,
        page:newPage,totalResults: parsedData.totalResults
      });
     
  }
      
   HandleNext= async()=>{
     let newPage=this.state.page+1;
     if (newPage>(Math.ceil(this.state.totalResults/10))){
           return;
     }
     else{
    let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=b019a4ee096a497c9d46d0fb3db8a947&page=${newPage}&pageSize=10`
  
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({articles:parsedData.articles,page:newPage,totalResults: parsedData.totalResults});}}
  render() {
    return (
      <div className='container my-3'> 
      <h1>Latest news</h1>
      <div className='row '>
      {this.state.articles.map((element)=>{
        return (<div className='col md-4' key={element.url?element.url:''}>
       <UpdateNews mytitle={element.title?element.title.slice(0,19):''} desc={element.description?element.description.slice(0,80):''} imgUrl={element.urlToImage?element.urlToImage:'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/da5f/live/c6506010-6274-11f0-b9ec-2f50122ae57d.jpg'} newsUrl={element.url?element.url:''} /> 
      </div>)
      })}
      
      </div>
      <div className="d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick={this.HandlePRevious}>&larr; previous</button>
        <button  type="button" className="btn btn-dark my-3 " onClick={this.HandleNext}>Next &rarr; </button></div>
      </div>
    )
  }
}

export default News
