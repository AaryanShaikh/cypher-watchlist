import React, { useEffect, useState } from 'react';

const NumberCounter = ({ end, title }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const animationDuration = 2000; // Duration of the animation in milliseconds
        const totalFrames = 60; // Total number of frames for the animation
        const increment = Math.ceil(end / totalFrames);

        let currentCount = 0;
        const interval = setInterval(() => {
            if (currentCount + increment >= end) {
                setCount(end);
                clearInterval(interval);
            } else {
                currentCount += increment;
                setCount(currentCount);
            }
        }, animationDuration / totalFrames);

        return () => {
            clearInterval(interval);
        };
    }, [end]);

    return <div className='ant-statistic'>
        <div style={{ marginBottom: "4px", color: "rgba(0, 0, 0, 0.45)", fontSize: "14px" }}>{title}</div>
        <div style={{ color: "rgba(0, 0, 0, 0.88)", fontSize: "24px", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'" }}>
            {count.toLocaleString()}
        </div>
    </div>;
};

export default NumberCounter;
