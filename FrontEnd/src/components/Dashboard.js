import React from 'react';
import { useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const matchPercentage = location.state?.matchPercentage || null;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {matchPercentage !== null ? (
        <div className="result">
          <h2>Match Percentage: {matchPercentage}%</h2>
        </div>
      ) : (
        <p>No comparison result available.</p>
      )}
    </div>
  );
};

export default Dashboard;
