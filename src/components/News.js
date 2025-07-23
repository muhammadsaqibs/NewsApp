import React, { Component } from 'react'
import UpdateNews from './UpdateNews'

export class News extends Component {
  /*articles=[{  //first element of array
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Women's ODI Cricket",
      "description": "Highlights of the second ODI between England and India at Lord's Cricket Ground in London.",
      "url": "https://www.bbc.co.uk/iplayer/episode/m002gbtf/womens-odi-cricket-2025-highlights-england-v-india-second-odi",
      "urlToImage": "https://ichef.bbci.co.uk/images/ic/1200x675/p0lpk2fw.jpg",
      "publishedAt": "2025-07-19T22:05:02Z",
      "content": "Highlights of the second ODI between England and India at Lord's Cricket Ground in London."
    },
    {             //second element of array
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": "Sam Drury",
      "title": "Mandhana stars as India inflict record loss on England",
      "description": "Smriti Mandhana scores a stunning century as India inflict England's heaviest T20 defeat by runs with a comprehensive 97-run triumph at Trent Bridge.",
      "url": "https://www.bbc.com/sport/cricket/articles/cx23w29edp8o",
      "urlToImage": "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/7a00/live/9eb97b30-542e-11f0-a2ff-17a82c2e8bc4.jpg",
      "publishedAt": "2025-06-28T16:41:46Z",
      "content": "It was clear Mandhana was in the mood from the moment she effortlessly sent her first ball back down the ground for four.\r\nShe had added two more boundaries before top-edging a pull shot off Em Arlot… [+1591 chars]"
    },
  {       //third element of array
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": "Stephan Shemilt",
      "title": "England have 'got to' pick Archer, says Anderson",
      "description": "England have \"got to\" play Jofra Archer in the third Test against India at Lord's, says James Anderson.",
      "url": "https://www.bbc.com/sport/cricket/articles/cwyrx6wkez5o",
      "urlToImage": "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/9f5e/live/0a439080-5b40-11f0-8c58-9faffe09c913.jpg",
      "publishedAt": "2025-07-07T15:11:43Z",
      "content": "England head coach Brendon McCullum said Archer is \"ready to go\" and will \"come into calculations\".\r\nArcher's return could come as part of a refresh of an England attack that looked weary in concedin… [+1033 chars]"
    }]*/
  
    async componentDidMount(){   //build in lifecycle method
      console.log("this is function");
      let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=b019a4ee096a497c9d46d0fb3db8a947"
  
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({articles:parsedData.articles});
    }
  constructor(){
      super();
       this.state={
        articles:[],   //make empty
        loading:false
      }
    }
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
      </div>
    )
  }
}

export default News
