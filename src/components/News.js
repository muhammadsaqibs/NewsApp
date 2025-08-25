import React, { useState, useEffect } from 'react';
import UpdateNews from './UpdateNews';

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchNews = async (pageNumber) => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${props.apikey}&page=${pageNumber}&pageSize=${props.pageSize}&category=${props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - Noval News`;
  fetchNews(page);
  // eslint-disable-next-line
}, []);


  const handlePrevious = async () => {
    const newPage = page - 1;
    setPage(newPage);
    fetchNews(newPage);
  };

  const handleNext = async () => {
    const newPage = page + 1;
    if (newPage > Math.ceil(totalResults / props.pageSize)) return;
    setPage(newPage);
    fetchNews(newPage);
  };

  return (
    <div className="container my-3">
      <h3 style={{ textAlign: 'center' }}>{`Top ${capitalizeFirstLetter(props.category)} - Headlines`}</h3>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="row">
        {!loading &&
          Array.isArray(articles) &&
          articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url ? element.url : ''}>
                <UpdateNews
                  mytitle={element.title ? element.title : ''}
                  desc={element.description ? element.description : ''}
                  imgUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : 'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/da5f/live/c6506010-6274-11f0-b9ec-2f50122ae57d.jpg'
                  }
                  newsUrl={element.url ? element.url : ''}
                  author={!element.author ? 'unknown' : element.author}
                  date={new Date(element.publishedAt).toGMTString()}
                />
              </div>
            );
          })}
      </div>

      <div className="d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark my-3"
          onClick={handlePrevious}
        >
          &larr; Previous
        </button>
        <button
          disabled={page >= Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-dark my-3"
          onClick={handleNext}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default News;
