import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  label: string;
  progress: number;
  subLabel?: string;
  precision?: number;
  theme?: 'dark' | 'light';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  progress,
  subLabel,
  precision = 2,
  theme = 'dark'
}) => {
  const percentage = Math.min(100, Math.max(0, progress));

  const commonHeader = (
    <div className="progress-bar-header">
      <span className="progress-bar-label">{label}</span>
      <span className="progress-bar-percentage">{percentage.toFixed(precision)}%</span>
    </div>
  );

  if (theme === 'light') {
    const totalBlocks = 20;
    const filledBlocksCount = Math.round((percentage / 100) * totalBlocks);
    const emptyBlocksCount = totalBlocks - filledBlocksCount;

    const bar = '█'.repeat(filledBlocksCount) + '░'.repeat(emptyBlocksCount);
    const boardLine = '─'.repeat(totalBlocks);

    return (
      <div className="progress-bar-container light">
        {commonHeader}
        <div className="progress-bar-ascii">
          {`┌${boardLine}┐
│${bar}│
└${boardLine}┘`}
        </div>
        {subLabel && <div className="progress-bar-footer">{subLabel}</div>}
      </div>
    );
  }

  return (
    <div className="progress-bar-container dark">
      {commonHeader}
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
