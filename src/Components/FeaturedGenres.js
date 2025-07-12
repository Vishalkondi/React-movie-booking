import React from 'react';

const genres = [
  { name: 'Action', color: 'primary' },
  { name: 'Comedy', color: 'warning' },
  { name: 'Drama', color: 'danger' },
  { name: 'Sci-Fi', color: 'info' },
  { name: 'Horror', color: 'dark' },
  { name: 'Animation', color: 'success' },
];

const FeaturedGenres = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎯 Featured Genres</h2>
      <div className="row justify-content-center">
        {genres.map((genre) => (
          <div className="col-6 col-md-2 mb-3" key={genre.name}>
            <div className={`card text-white bg-${genre.color} shadow text-center`}>
              <div className="card-body py-3">
                <h6 className="card-title mb-0">{genre.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedGenres;
