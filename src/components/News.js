import React, { useState, useEffect } from 'react';
import UpdateNews from './UpdateNews';

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchNews = async (pageNumber) => {
    setLoading(true);
    try {
      const apiKey = props.apikey || process.env.REACT_APP_NEWS_API_KEY || process.env.NEWS_API_KEY;
      const allowedCategories = ['business','entertainment','environment','food','health','politics','science','sports','technology','top'];
      let categoryParam = '';
      if (props.category) {
        const cat = String(props.category).toLowerCase();
        if (allowedCategories.includes(cat)) {
          categoryParam = `&category=${encodeURIComponent(cat)}`;
        } else {
          console.warn(`Category \"${props.category}\" is not supported by Newsdata.io; omitting category filter.`);
        }
      }
      const countryParam = props.country ? `&country=${encodeURIComponent(props.country)}` : '';
      const qParam = props.search ? `&q=${encodeURIComponent(props.search)}` : '';
      const pageParam = `&page=${pageNumber}`;

      const endpoint = props.search ? 'latest' : 'news';
      let url = `https://newsdata.io/api/1/${endpoint}?apikey=${apiKey}${categoryParam}${countryParam}&language=en${qParam}${pageParam}`;
      let response = await fetch(url);
      let parsedData = await response.json();

      // If Newsdata returns 422 for category (public plan restrictions), retry without category
      if (!response.ok && response.status === 422 && categoryParam) {
        console.warn('422 received, retrying without category param');
        url = `https://newsdata.io/api/1/${endpoint}?apikey=${apiKey}${countryParam}&language=en${qParam}${pageParam}`;
        response = await fetch(url);
        parsedData = await response.json();
      }

      // If still 422 and message indicates pagination issue, retry without page parameter
      if (!response.ok && response.status === 422) {
        const code = parsedData && parsedData.results && parsedData.results.code;
        const msg = parsedData && parsedData.results && parsedData.results.message;
        if (code === 'UnsupportedFilter' && msg && msg.toLowerCase().includes('next page')) {
          console.warn('422 pagination error received, retrying without page parameter');
          url = `https://newsdata.io/api/1/${endpoint}?apikey=${apiKey}${categoryParam}${countryParam}&language=en${qParam}`; // drop page
          response = await fetch(url);
          parsedData = await response.json();
        }
      }

      if (!response.ok) {
        console.error('Newsdata API error', response.status, parsedData);
        setError(parsedData);
        setArticles([]);
        setTotalResults(0);
        return;
      }

      setError(null);

      const results = parsedData.results || parsedData.articles || [];
      setArticles(results);

      const total = parsedData.totalResults || parsedData.total_results || parsedData.count || results.length || 0;
      setTotalResults(total);
    } catch (err) {
      console.error('Failed fetching news:', err);
      setError({ message: err.message });
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
        {!loading && error && (
          <div className="col-12">
            <div className="alert alert-danger">API error: {error.message || JSON.stringify(error)}</div>
          </div>
        )}

        {!loading && !error && Array.isArray(articles) &&
          articles.map((element) => {
            const img = element.image_url || element.urlToImage || element.image;
            const newsLink = element.link || element.url || '';
            const author = Array.isArray(element.creator) && element.creator.length > 0 ? element.creator[0] : element.author || 'unknown';
            const dateVal = element.pubDate || element.publishedAt || element.date || '';
            return (
              <div className="col-md-4 mb-4" key={newsLink || element.title}>
                <UpdateNews
                  mytitle={element.title}
                  desc={element.description}
                  imgUrl={img}
                  newsUrl={newsLink}
                  author={author}
                  date={dateVal}
                  sourceName={element.source_name}
                  source_url={element.source_url}
                  categories={element.category}
                  keywords={element.keywords}
                  pubDate={element.pubDate}
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
