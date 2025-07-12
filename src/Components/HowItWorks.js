import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: '🎬',
      title: 'Browse Movies',
      desc: 'Explore trending movies and TV shows.',
    },
    {
      icon: '🕒',
      title: 'Choose Showtime',
      desc: 'Pick the showtime that fits your schedule.',
    },
    {
      icon: '💺',
      title: 'Book Seats',
      desc: 'Select how many tickets you need.',
    },
    {
      icon: '✅',
      title: 'Get Confirmation',
      desc: 'Receive your booking instantly.',
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💡 How It Works</h2>
      <div className="row text-center">
        {steps.map((step, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div style={{ fontSize: '2rem' }}>{step.icon}</div>
                <h5 className="mt-2">{step.title}</h5>
                <p className="text-muted">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
