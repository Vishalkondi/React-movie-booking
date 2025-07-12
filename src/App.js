import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './Components/MovieList';
import BookingForm from './Components/BookingForm';
import BookingHistory from './Components/BookingHistory';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [view, setView] = useState('home'); // home | history
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} shadow-sm`}>
        <div className="container">
          <span
            className="navbar-brand fw-bold fs-4"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setView('home');
              setSelectedMovie(null);
              setSelectedTime(null);
            }}
          >
            🎬 Movie Booking App
          </span>

          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary me-2" onClick={toggleTheme}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button className="btn btn-outline-primary" onClick={() => setView('history')}>
              📜 Booking History
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        {view === 'history' ? (
          <BookingHistory />
        ) : selectedMovie && selectedTime ? (
          <BookingForm
            movie={selectedMovie}
            time={selectedTime}
            onBack={() => {
              setSelectedMovie(null);
              setSelectedTime(null);
            }}
          />
        ) : (
          <MovieList
            onSelect={(movie, time) => {
              setSelectedMovie(movie);
              setSelectedTime(time);
            }}
          />
        )}
      </div>

      {/* Footer */}
      <footer className={`text-center py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <div className="container">
          © {new Date().getFullYear()} Movie Booking App | Made by Vishal 🎥
        </div>
      </footer>
    </div>
  );
};

export default App;
