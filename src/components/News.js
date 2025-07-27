import React, { Component } from 'react'
import UpdateNews from './UpdateNews'
export class News extends Component {
     
    async componentDidMount(){   //build in lifecycle method
      const {page}=this.state;
       let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.props.apikey}&page=${page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
     this.setState({loading:true});
  
      let data= await fetch(url);
      let parsedData= await data.json();
    
      this.setState({articles:parsedData.articles,totalResults: parsedData.totalResults ,loading:false});
    }
   capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  constructor(props){
      super(props);
       this.state={
        articles:[],   //make empty
        loading:true,
        page:1,
        totalResults:0
      }
         document.title = `${this.capitalizeFirstLetter(this.props.category)} - Noval News`;
    }
     

   HandlePRevious= async ()=> {
    let newPage=this.state.page-1;
           
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.props.apikey}&page=${newPage}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

      this.setState({loading:true});
      let data= await fetch(url);
      let parsedData= await data.json();

      this.setState({articles:parsedData.articles,
        page:newPage,totalResults: parsedData.totalResults,loading:false
      });
     
  }
      
   HandleNext= async()=>{
     let newPage=this.state.page+1;
     if (newPage>(Math.ceil(this.state.totalResults/this.props.pageSize))){
           return;
     }
     else{
    let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.props.apikey}&page=${newPage}&pageSize=${this.props.pageSize}&category=${this.props.category}`
      this.setState({loading:true});
      let data= await fetch(url);
      let parsedData= await data.json();
      
      this.setState({articles:parsedData.articles,page:newPage,totalResults: parsedData.totalResults,loading:false});}}
  render() {
    return (
      <div className='container my-3'> 
      <h3 style={{textAlign:'center'}}>{`Top ${this.capitalizeFirstLetter(this.props.category)} - Headlines`}</h3>
      
      {this.state.loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>)}
      <div className='row '>
      {!this.state.loading && Array.isArray(this.state.articles) && this.state.articles.map((element)=>{
        return (<div className='col-md-4' key={element.url?element.url:''}>
       <UpdateNews mytitle={element.title?element.title:''} desc={element.description?element.description:''} imgUrl={element.urlToImage?element.urlToImage:'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/da5f/live/c6506010-6274-11f0-b9ec-2f50122ae57d.jpg'} newsUrl={element.url?element.url:''} author={!element.author?'unknown':element.author} date={new Date(element.publishedAt).toGMTString()} /> 
      </div>)
      })}
      
      </div>
      <div className="d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick={this.HandlePRevious}>&larr; previous</button>
        <button  disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark my-3 " onClick={this.HandleNext}>Next &rarr; </button></div>
      </div>
    )
  }
}

export default News
