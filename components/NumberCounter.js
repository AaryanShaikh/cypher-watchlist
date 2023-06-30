import React, { useEffect, useState } from 'react';

const NumberCounter = ({ end, title, range }) => {
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
        <div className='textFont' style={{ marginBottom: "4px", color: "rgb(209 203 203)", fontSize: range ? "12px" : "14px" }}>{title}</div>
        <div style={{ color: "#fff", fontSize: range ? "22px" : "24px", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'" }}>
            {count.toLocaleString()}
        </div>
    </div>;
};

export default NumberCounter;
