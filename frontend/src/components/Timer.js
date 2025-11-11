import React, { useEffect } from 'react';

function Timer({ timeLeft, setTimeLeft }) {
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, setTimeLeft]);

    const timerColor = timeLeft <= 10 ? 'red' : 'green';

    return (
        <div className="timer" style={{ color: timerColor }}>
            Time: {timeLeft}s
        </div>
    );
}

export default Timer;
