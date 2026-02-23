import React from 'react';

const placeholder = 'https://via.placeholder.com/800x450?text=No+Image';

export default function UpdateNews(props) {
  const title = props.mytitle || props.title || '';
  const desc = props.desc || '';
  const img = props.imgUrl || props.image_url || placeholder;
  const url = props.newsUrl || props.link || '#';
  const source = props.sourceName || props.source_name || '';
  const categories = props.categories || props.category || [];
  const keywords = props.keywords || [];
  const pubDate = props.pubDate || props.date || '';

  const shortTitle = title.split(' ').slice(0, 12).join(' ') + (title.split(' ').length > 12 ? '...' : '');
  const shortDesc = desc && desc !== 'ONLY AVAILABLE IN PAID PLANS' ? desc.split('.').slice(0, 2).join('.') + '.' : '';

  return (
    <article className="card h-100 shadow-sm" style={{ minHeight: 420 }}>
      <div style={{ height: 220, overflow: 'hidden' }}>
        <img src={img} alt={title} className="card-img-top w-100" style={{ objectFit: 'cover', height: '100%' }} />
      </div>
      <div className="card-body d-flex flex-column">
        <div className="mb-2 d-flex justify-content-between align-items-start">
          <div>
            {source && <span className="badge bg-info text-dark me-1">{source}</span>}
            {Array.isArray(categories) && categories.slice(0,2).map((c, i) => (
              <span key={i} className="badge bg-secondary ms-1">{c}</span>
            ))}
          </div>
          <small className="text-muted">{pubDate ? new Date(pubDate).toLocaleString() : ''}</small>
        </div>

        <h5 className="card-title" style={{ lineHeight: '1.2' }}>{shortTitle}</h5>
        <p className="card-text text-muted flex-grow-1">{shortDesc}</p>

        <div className="mt-2">
          {Array.isArray(keywords) && keywords.slice(0,4).map((k, idx) => (
            <span key={idx} className="badge bg-light text-dark me-1">{k}</span>
          ))}
        </div>

        <div className="mt-3 d-flex justify-content-between align-items-center">
          <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">Read Full Article</a>
          <a href={props.source_url || props.sourceUrl || '#'} className="text-decoration-none text-muted small">More from {source || 'source'}</a>
        </div>
      </div>
    </article>
  );
}
