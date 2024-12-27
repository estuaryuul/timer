import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState();
  const [isRuning, setIsRuning] = useState(false);
  const [status, setStatus] = useState("Session");
  const alarm = document.getElementById("audio");

  useEffect(() => {
    setTimer(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    let timeInterval;
    if (isRuning) {
      timeInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      if (timer < 0) {
        alarm.play();
        setTimeout(() => {
          alarm.pause();
          alarm.currentTime = 0;
        }, 3000);
        if (status === "Session") {
          setStatus("Break");
          setTimer(breakLength * 60);
        }
        if (status === "Break") {
          setStatus("Session");
          setTimer(sessionLength * 60);
        }
      }
    }
    return () => clearInterval(timeInterval);
  }, [alarm, breakLength, isRuning, sessionLength, status, timer]);

  function formatTimer(time) {
    const minTimer = Math.floor(time / 60);
    const secTimer = time % 60;

    return `${String(minTimer).padStart(2, "0")} : ${String(secTimer).padStart(
      2,
      "0"
    )}`;
  }

  const handleStartPause = () => {
    setIsRuning(!isRuning ? true : false);
  };

  const handleReset = () => {
    setTimer(sessionLength * 60);
    setIsRuning(false);
    setStatus("Session");
  };

  const handleBreakIncrement = () => {
    if (isRuning) return;
    if (breakLength < 60) {
      setBreakLength((prev) => {
        return prev + 1;
      });
    }
  };

  const handleBreakDecrement = () => {
    if (isRuning) return;
    if (breakLength > 1) {
      setBreakLength((prev) => {
        return prev - 1;
      });
    }
  };

  const handleSessionIncrement = () => {
    if (isRuning) return;
    if (sessionLength < 60) {
      setSessionLength((prev) => {
        return prev + 1;
      });
    }
  };

  const handleSessionDecrement = () => {
    if (isRuning) return;
    if (sessionLength > 1) {
      setSessionLength((prev) => {
        return prev - 1;
      });
    }
  };

  return (
    <div className="App">
      <div id="title">
        <h1>25 + 5 Clock</h1>
      </div>
      <div id="break-session-container">
        <div id="break-container">
          <h2 id="break-label">Break Length</h2>
          <div className="incre-decre-container">
            <div
              id="break-increment"
              className="btn"
              onClick={handleBreakIncrement}
            >
              &#8593;
            </div>
            <div id="break-length">{breakLength}</div>
            <div
              id="break-decrement"
              className="btn"
              onClick={handleBreakDecrement}
            >
              &#8595;
            </div>
          </div>
        </div>
        <div id="session-container">
          <h2 id="session-label">Session Length</h2>
          <div className="incre-decre-container">
            <div
              id="session-increment"
              className="btn"
              onClick={handleSessionIncrement}
            >
              &#8593;
            </div>
            <div id="session-length">{sessionLength}</div>
            <div
              id="session-decrement"
              className="btn"
              onClick={handleSessionDecrement}
            >
              &#8595;
            </div>
          </div>
        </div>
      </div>
      <div id="timer-container">
        <h2 id="timer-label">{status}</h2>
        <div id="time-left">{formatTimer(timer)}</div>
        <audio id="audio">
          <source
            src={`${process.env.PUBLIC_URL}/audio/beep.mp3`}
            type="audio/mpeg"
          />
        </audio>
      </div>
      <div id="control-button">
        <div id="start_stop" className="btn" onClick={handleStartPause}>
          {isRuning ? "⏸" : "▶"}
        </div>
        <div id="reset" className="btn" onClick={handleReset}>
          &#8635;
        </div>
      </div>
    </div>
  );
}

export default App;
