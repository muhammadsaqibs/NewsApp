import React, { Component } from 'react';
import UpdateNews from './UpdateNews';
// [infinite-scroll] Added import
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(props) {
    super(props);
    // [init] Initialized articles, page, totalResults
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    // [ui] Set document title with category
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Noval News`;
  }

  // [lifecycle] Load articles on mount
  async componentDidMount() {
    this.fetchArticles();
  }

  // [api] First time data fetch
  fetchArticles = async () => {
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b019a4ee096a497c9d46d0fb3db8a947&page=${page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  // [infinite-scroll] Fetch more on scroll
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
     if (this.state.articles.length >= this.state.totalResults) {
    this.setState({ loading: false }); // ✅ stop spinner
    return; // ✅ no more fetch
  }
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b019a4ee096a497c9d46d0fb3db8a947&page=${nextPage}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: nextPage,
  
    });
  };

  render() {
    return (
      <div className="container my-3" style={{ overflowX: 'hidden' }}>
        <h3 style={{ textAlign: 'center' }}>
          {`Top ${this.capitalizeFirstLetter(this.props.category)} - Headlines`}
        </h3>

        {/* [ui] Replaced pagination with infinite scroll */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.state.articles && this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className="text-center my-4">
              <div className="my-3 spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
          
        >
          <div className="row" >
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url || Math.random()}>
                  <UpdateNews
                    mytitle={element.title || ''}
                    desc={element.description || ''}
                    imgUrl={
                      element.urlToImage 
                      
                    }
                    newsUrl={element.url || ''}
                    author={!element.author ? 'Unknown' : element.author}
                    date={new Date(element.publishedAt).toGMTString()}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
