import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRated = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/shows').then((res) => {
      const top = res.data.filter(show => show.rating.average).sort((a, b) => b.rating.average - a.rating.average);
      setShows(top.slice(0, 6));
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🔥 Top Rated Shows</h2>
      <div className="row">
        {shows.map((show) => (
          <div className="col-md-4 mb-4" key={show.id}>
            <div className="card h-100 shadow border-0">
              <img
                src={show.image?.original}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
                alt={show.name}
              />
              <div className="card-body">
                <h5 className="card-title">{show.name}</h5>
                <p className="card-text">
                  ⭐ {show.rating.average} | {show.genres.join(', ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
