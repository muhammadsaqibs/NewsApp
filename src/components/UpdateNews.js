import React from 'react';

export default function UpdateNews(props) {
  return (
    <div>
      <div className="card h-100" style={{ minHeight: "500px" }}>
        {props.imgUrl && (
          <img
            src={props.imgUrl}
            className="card-img-top"
            alt="news"
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{props.mytitle ? props.mytitle.split(' ').slice(0,3).join(' ') + '...' : ''}</h5>
          <p className="card-text">{props.desc ? props.desc.split('.').slice(0, 2).join('.') + '.' : ''}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <small className="text-body-secondary">
            By {props.author ? props.author : "Unknown"} on{" "}
            {new Date(props.date).toGMTString()}
          </small>
          <a
            href={props.newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary ms-2"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
