import React, { useState, useEffect } from 'react';

const CircularProgress = ({ value, maxValue, show }) => {
    const [count, setCount] = useState(0);
    const progress = (value / maxValue) * 100;

    useEffect(() => {
        let start = count; // Start from the previous state's value
        const increment = Math.ceil((value - count) / 100); // Calculate the increment based on the difference
        const duration = 1500; // Animation duration in milliseconds

        const timer = setInterval(() => {
            start += increment;
            if (start > value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, duration / 100);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="circular-progress" style={{ transform: `scale(${show ? "1" : "0"})`, transition: ".5s ease-in-out" }}>
            <svg className="progress-ring" width="120" height="120">
                <circle
                    className="progress-ring__circle"
                    strokeDasharray={`${progress * 3.14}, 314`}
                    cx="60"
                    cy="60"
                    r="50"
                />
            </svg>
            <h2 className="progress-text">{count}%</h2>
        </div>
    );
};

export default CircularProgress;