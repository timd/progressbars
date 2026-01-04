import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  label: string;
  progress: number;
  subLabel?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress, subLabel }) => {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-bar-label">{label}</span>
        <span className="progress-bar-percentage">{percentage.toFixed(6)}%</span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {subLabel && <div className="progress-bar-footer">{subLabel}</div>}
    </div>
  );
};

export default ProgressBar;
