import React, { useEffect, useState } from 'react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(saved.reverse()); // recent first
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">📜 Booking History</h3>
      {bookings.length === 0 ? (
        <p className="text-muted text-center">No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((b, idx) => (
            <div className="col-md-6 mb-4" key={idx}>
              <div className="card border shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">🎬 {b.movie}</h5>
                  <p><strong>Name:</strong> {b.name}</p>
                  <p><strong>Time:</strong> {b.time}</p>
                  <p><strong>Seats:</strong> {b.seats}</p>
                  <p className="text-muted small">Booking #{bookings.length - idx}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
