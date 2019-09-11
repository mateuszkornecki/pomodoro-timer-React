import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

function CurrentTimebox(props) {
    const {
        title,
        isRunning,
        isPaused,
        isEditable,
        pausesCount,
        remainingTime,
        actualPercent,
        taskTimeInSeconds,
        handleStart,
        handleStop,
        togglePause,
        onConfirm
    } = props;

    let hours;
    let minutes;
    let seconds;
    let ms;
    let fullSec;

    const reworkTime = value => {
        fullSec = Math.floor(value);
        hours = Math.floor(value / 3600);
        minutes = Math.floor(value / 60);
        seconds = Math.floor(value % 60);
        //to prevent counting after passing 0
        ms = fullSec >= 0 ? Math.floor((value - fullSec) * 1000) : 0;
        // return(hours, minutes, seconds, ms);
    };
    //if timebox is not running display time entered in input else display  remaining time
    reworkTime(isRunning ? remainingTime : taskTimeInSeconds);
    return (
        <div
            className={
                isEditable ? "CurrentTimebox inactive" : "CurrentTimebox"
            }
        >
            <h1>{title}</h1>
            <Clock
                className={isPaused ? "inactive" : ""}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                miliseconds={ms}
                coloredNumbers={true}
            />
            <ProgressBar
                className={isPaused ? "inactive" : ""}
                percent={actualPercent}
                trackRemaining={false}
                red={true}
            />
            <button onClick={onConfirm} disabled={isEditable}>
                Edytuj
            </button>
            <button onClick={handleStart} disabled={isRunning}>
                Start
            </button>
            <button onClick={handleStop} disabled={!isRunning}>
                Stop
            </button>
            <button onClick={togglePause} disabled={!isRunning}>
                {isPaused ? "Wznów" : "Pauzuj"}
            </button>
            Liczba przerw: {pausesCount}
        </div>
    );
}

export default CurrentTimebox;
