import React from 'react';

const CircularProgress = ({ value, show }) => {
    return (
        <div className="circular-progress" style={{ transition: ".5s ease-in-out", opacity: show ? "1" : "0" }}>
            <svg className="progress-ring" width="120" height="120">
                <circle
                    className="progress-ring__circle"
                    strokeDasharray={`${value * 3.14}, 314`}
                    cx="60"
                    cy="60"
                    r="50"
                />
            </svg>
            <h2 className="progress-text loadText">{value}%</h2>
        </div>
    );
};

export default CircularProgress;