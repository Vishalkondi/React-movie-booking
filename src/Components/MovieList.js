import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = ({ onSelect }) => {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch live shows from TVMaze API
  const fetchShows = async () => {
    try {
      const res = await axios.get('https://api.tvmaze.com/shows');
      setShows(res.data);
    } catch (err) {
      console.error('Error fetching shows:', err);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  // Filter shows by search input
  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎬 Available Shows</h2>

      {/* Search bar */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies or shows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Show cards */}
      <div className="row">
        {filteredShows.slice(0, 12).map((show) => (
          <div className="col-md-4 mb-4" key={show.id}>
            <div className="card border-0 shadow h-100">
              <img
                src={show.image?.original || 'https://via.placeholder.com/500x300?text=No+Image'}
                className="card-img-top"
                alt={show.name}
                style={{ height: '350px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{show.name}</h5>
                <p className="text-muted mb-2">
                  ⭐ {show.rating?.average || 'N/A'} | {show.genres.join(', ')}
                </p>
                <div className="mb-2">
                  {['10:00 AM', '1:00 PM', '6:00 PM'].map((time) => (
                    <button
                      key={time}
                      className="btn btn-outline-primary btn-sm me-2 mb-2"
                      onClick={() => onSelect(show.name, time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredShows.length === 0 && (
        <div className="text-center mt-4 text-muted">No shows found.</div>
      )}
    </div>
  );
};

export default MovieList;
