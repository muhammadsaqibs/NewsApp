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
    try {
      const apiKey = props.apikey || process.env.NEWS_API_KEY;
      const categoryParam = props.category ? `&category=${encodeURIComponent(props.category)}` : '';
      const countryParam = props.country ? `&country=${encodeURIComponent(props.country)}` : '';
      const qParam = props.search ? `&q=${encodeURIComponent(props.search)}` : '';
      const pageParam = `&page=${pageNumber}`;

      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}${categoryParam}${countryParam}&language=en${qParam}${pageParam}`;
      const data = await fetch(url);
      const parsedData = await data.json();

      const results = parsedData.results || parsedData.articles || [];
      setArticles(results);

      const total = parsedData.totalResults || parsedData.total_results || parsedData.count || results.length || 0;
      setTotalResults(total);
    } catch (err) {
      console.error('Failed fetching news:', err);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
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

      <div className="row d-flex">
        {!loading && Array.isArray(articles) &&
          articles.map((element) => {
            const img = element.image_url || element.urlToImage || element.image;
            const newsLink = element.link || element.url || '';
            const author = Array.isArray(element.creator) && element.creator.length > 0 ? element.creator[0] : element.author || 'unknown';
            const dateVal = element.pubDate || element.publishedAt || element.date || '';
            return (
              <div className="col-md-4" key={newsLink || element.title}>
                <UpdateNews
                  mytitle={element.title ? element.title : ''}
                  desc={element.description ? element.description : ''}
                  imgUrl={img}
                  newsUrl={newsLink}
                  author={author}
                  date={dateVal}
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
