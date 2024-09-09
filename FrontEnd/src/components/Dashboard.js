import React from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';
import resumeTips from './resumeTips';

const getTipsForPercentage = (percentage) => {
  const ranges = Object.keys(resumeTips).map(Number);
  const closestRange = ranges.reduce((prev, curr) => (Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev));
  return resumeTips[closestRange];
};

const getTipsClass = (percentage) => {
  if (percentage >= 90) return 'excellent';
  if (percentage >= 80) return 'good';
  if (percentage >= 60) return 'average';
  if (percentage >= 40) return 'poor';
  return 'very-poor';
};

const Dashboard = () => {
  const location = useLocation();
  const matchPercentage = location.state?.matchPercentage || null; // Default to 0 if no matchPercentage

  const tips = getTipsForPercentage(matchPercentage);
  const tipsClass = getTipsClass(matchPercentage);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Score</h2>
        {matchPercentage !== null ? (
          <div className="circular-chart">
            <CircularProgressbar
              value={matchPercentage}
              text={`${matchPercentage}%`}
              styles={buildStyles({
                textColor: '#f88',
                pathColor: '#4caf50',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
        ) : (
          <p>No comparison result available.</p>
        )}
      </aside>

      <main className="dashboard">
        <section className="resume-tips">
          <h2>Resume Improvement Tips</h2>
          <ul className={tipsClass}>
            {tips.map((tip, index) => (
              <li key={index} className={`tip-item ${tipsClass}`}>{tip}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;




