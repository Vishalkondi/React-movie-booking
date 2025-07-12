import React, { useState } from 'react';
import jsPDF from 'jspdf';

const BookingForm = ({ movie, time, onBack }) => {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = { name, movie, time, seats: seats.length };
    let history = JSON.parse(localStorage.getItem('bookings') || '[]');
    history.push(booking);
    localStorage.setItem('bookings', JSON.stringify(history));
    setSubmitted(true);
  };

  const downloadTicket = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('🎫 Movie Ticket Confirmation', 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Movie: ${movie}`, 20, 50);
    doc.text(`Show Time: ${time}`, 20, 60);
    doc.text(`Seats: ${seats.join(', ')}`, 20, 70);
    doc.save('movie-ticket.pdf');
  };

  const toggleSeat = (seatNumber) => {
    if (seats.includes(seatNumber)) {
      setSeats(seats.filter((s) => s !== seatNumber));
    } else {
      setSeats([...seats, seatNumber]);
    }
  };

  if (submitted)
    return (
      <div className="container mt-5">
        <div className="card shadow p-5 text-center bg-light">
          <h3 className="text-success mb-3">🎉 Booking Confirmed!</h3>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Movie:</strong> {movie}</p>
          <p><strong>Show Time:</strong> {time}</p>
          <p><strong>Seats:</strong> {seats.join(', ')}</p>
          <button className="btn btn-outline-success mt-3 me-2" onClick={downloadTicket}>
            Download Ticket 🎟️
          </button>
          <button className="btn btn-secondary mt-3" onClick={onBack}>
            Book Another
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="row">
          {/* Movie Info */}
          <div className="col-md-5 border-end d-flex flex-column justify-content-center align-items-start ps-4">
            <h3 className="mb-3">🎬 {movie}</h3>
            <p><span className="fw-bold">🕒 Show Time:</span> {time}</p>
            <p><span className="fw-bold">💺 Selected Seats:</span> {seats.join(', ') || 'None selected'}</p>
          </div>

          {/* Booking Form */}
          <div className="col-md-7 mt-4 mt-md-0">
            <h4 className="mb-4">🎟️ Fill Your Details</h4>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Seat Grid */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Choose Your Seats:</label>
                <div className="d-flex flex-wrap gap-2">
                  {[...Array(20).keys()].map((i) => {
                    const seatNum = i + 1;
                    const isSelected = seats.includes(seatNum);
                    return (
                      <button
                        key={seatNum}
                        type="button"
                        onClick={() => toggleSeat(seatNum)}
                        className={`btn btn-sm ${isSelected ? 'btn-success' : 'btn-outline-secondary'}`}
                      >
                        {seatNum < 10 ? `0${seatNum}` : seatNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buttons */}
              <button className="btn btn-primary me-2" disabled={seats.length === 0 || !name}>
                Confirm Booking
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
