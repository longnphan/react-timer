import React, { useState, useRef } from "react";
import "./App.css";

//Adds zero in front of minutes and seconds when the time is a single digit character.
function padTime(time) {
    return time.toString().padStart(2, "0");
}

export default function App() {
    // Timer States
    const[timeLeft, setTimeLeft] = useState(5 * 60);
    const[isRunning, setIsRunning] = useState(false);

    // Timer variables
    const minutes = padTime(Math.floor(timeLeft / 60));
    const seconds = padTime((timeLeft - (minutes * 60)));
    const intervalRef = useRef(null);

    // Starts timer
    function startTimer() {

        setIsRunning(true);

        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => {
                if (timeLeft >= 1) {
                    return timeLeft - 1;
                } else {
                    return 0;
                }
            });
        }, 1000);
    }
    
    // Stops Timer
    function stopTimer() {
        clearInterval(intervalRef.current);

        setIsRunning(false);
    }

    // Resets Timer
    function resetTimer() {
        clearInterval(intervalRef.current);
        setTimeLeft(5*60);
        setIsRunning(false);
    }
    
    return(
        <div className="container">
            <h1><u>Timer</u></h1>

            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>

            <div className="buttons">
                {/* Conditional rendering that removes the start and reset button if the timer 
                is running and removes the stop button if the timer is not running */}
                {!isRunning && <button onClick={startTimer}>Start</button>}
                <br />
                {isRunning && <button onClick={stopTimer}>Stop</button>}
                {!isRunning && <button onClick={resetTimer}>Reset</button>}
            </div>
        </div>
    );
}
