import React from 'react';

export default function UpdateNews(props) {
  return (
    <div>
      <div className="card">
        {props.imgUrl && (
          <img
            src={props.imgUrl}
            className="card-img-top"
            alt="news"
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{props.mytitle}</h5>
          <p className="card-text">{props.desc}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {props.author ? props.author : "Unknown"} on{" "}
              {new Date(props.date).toGMTString()}
            </small>
          </p>
          <a
            href={props.newsUrl}
            className="btn btn-dark"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
