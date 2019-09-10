import React from "react";

import uuid from "uuid";
import Clock from "./Clock";

function timeInterval(min, max, value) {
    //It will return a number between min and max
    value = Math.max(min, Math.min(value, max));
    return value;
}

function fillWithZeros(targetLength, value) {
    //It will add zeros  before value till value.length = targetLength
    value = value.toString();
    while (value.length < targetLength) {
        value = `0${value}`;
    }
    return value;
}

function normalizeTime(min, max, targetLength, value) {
    return fillWithZeros(targetLength, timeInterval(min, max, value));
}

function ProgressBar({ className = "", percent, trackRemaining }) {
    const ProgressBarClasses =
        trackRemaining === true
            ? `ProgressBar ProgressBar--reverse ${className}`
            : `ProgressBar ${className}`;
    const ProgressBarWidth =
        trackRemaining === true ? `calc(100% - ${percent}%)` : `${percent}%`;

    return (
        <div className={ProgressBarClasses}>
            <div style={{ width: `${ProgressBarWidth}` }}></div>
        </div>
    );
}

class EditableTimebox extends React.Component {
    state = {
        title: "To pole powinno działać",
        taskTimeInSeconds: 0,
        isRunning: false,
        isPaused: false,
        isEditable: true,
        pausesCount: 0,
        initialTime: 0,
        actualTime: 0,
        taskTimeInMs: 0,
        endTime: 0,
        remainingTime: 0,
        elapsedTime: 0,
        actualPercent: 0
    };

    handleChangeTitle = e => {
        this.setState({
            title: e.target.value
        });
    };

    handleChangeTaskTime = e => {
        const { elapsedTime } = this.state;
        this.setState({
            //* 60 to convert seconds to minutes
            taskTimeInSeconds: e.target.value * 60,
            taskTimeInMs: e.target.value * 60 * 1000
        });
        //elapsedTime>0 mean that program is running or it is running or it is paused
        if (elapsedTime > 0) {
            this.handleChangeTaskTimeWhileRunning();
        }
    };

    handleChangeTaskTimeWhileRunning = () => {
        //needed to edit taskTime while counting down!
        this.setState(state => ({
            taskTimeInMs: state.taskTimeInMs - state.elapsedTime * 1000
        }));
        this.setEndTime();
        this.setRemainingTime();
    };

    handleStart = () => {
        const { taskTimeInMs, isRunning } = this.state;
        const initialTime = Date.now();
        this.setState({
            isRunning: true,
            initialTime: initialTime
        });
        this.start();
        this.setEndTime();
    };
    handleStop = () => {
        this.stop();
        const { taskTimeInSeconds } = this.state;
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            initialTime: 0,
            actualTime: 0,
            taskTimeInMs: taskTimeInSeconds * 1000,
            endTime: 0,
            remainingTime: 0,
            actualPercent: 0,
            elapsedTime: 0
        });
    };

    handleEdit = () => {
        this.setState(function (prevState) {
            const isEditable = !prevState.isEditable;
            return {
                isEditable: isEditable
            };
        });
    };

    start = () => {
        this.countDown = setInterval(() => {
            let actualTime = Date.now();
            this.setState({
                actualTime: actualTime
            });
            // keeps remaining time actual
            this.setRemainingTime();
            this.setElapsedTime();
            this.setActualPercent();
            this.forceStop();
        }, 10);
    };

    stop = () => {
        clearInterval(this.countDown);
    };

    forceStop = () => {
        const { remainingTime } = this.state;
        if (remainingTime <= 0) {
            this.stop();
        }
    };

    togglePause = () => {
        this.setState(function (prevState) {
            const isPaused = !prevState.isPaused;
            return {
                isPaused: isPaused,
                pausesCount: prevState.isPaused
                    ? prevState.pausesCount + 1
                    : prevState.pausesCount
            };
        });
        const { isPaused } = this.state;
        isPaused ? this.repause() : this.stop();
    };

    repause = () => {
        //create new initialTime, use remainingTime as new taskTimeInMsInMiliseconds
        const { remainingTime, taskTimeInMs, isRunning } = this.state;
        const initialTime = Date.now();
        const taskTimeAfterPause = remainingTime * 1000;
        this.setState({
            isRunning: true,
            initialTime: initialTime,
            taskTimeInMs: taskTimeAfterPause
        });
        this.start();
        this.setEndTime();
    };

    setEndTime = () => {
        this.setState(function (prevState) {
            let endTime = prevState.initialTime + prevState.taskTimeInMs;
            return {
                endTime: endTime
            };
        });
    };

    setRemainingTime = () => {
        this.setState(function (prevState) {
            let remainingTime =
                (prevState.endTime - prevState.actualTime) / 1000;
            return {
                remainingTime: remainingTime
            };
        });
    };

    setElapsedTime = () => {
        this.setState(function (prevState) {
            let elapsedTime =
                prevState.taskTimeInSeconds - prevState.remainingTime;
            return {
                elapsedTime: elapsedTime
            };
        });
    };

    setActualPercent = () => {
        this.setState(function (prevState) {
            //*1000 to convert seconds to ms and *100 to convert fraction to a full number
            let actualPercent =
                (prevState.elapsedTime / prevState.taskTimeInSeconds) * 100;
            return {
                actualPercent: actualPercent
            };
        });
    };

    render() {
        const {
            title,
            taskTimeInSeconds,
            isRunning,
            isPaused,
            isEditable,
            pausesCount,
            initialTime,
            actualTime,
            taskTimeInMs,
            endTime,
            remainingTime,
            actualPercent,
            elapsedTime
        } = this.state;

        return (
            <>
                <TimeboxEditor
                    title={title}
                    taskTimeInSeconds={taskTimeInSeconds}
                    isRunning={isRunning}
                    isEditable={isEditable}
                    onChangeTitle={this.handleChangeTitle}
                    onChangeTaskTime={this.handleChangeTaskTime}
                    onConfirm={this.handleEdit}
                // handleStart={this.handleStart}
                />
                <CurrentTimebox
                    title={title}
                    isRunning={isRunning}
                    isPaused={isPaused}
                    isEditable={isEditable}
                    pausesCount={pausesCount}
                    initialTime={initialTime}
                    actualTime={actualTime}
                    taskTimeInMs={taskTimeInMs}
                    endTime={endTime}
                    remainingTime={remainingTime}
                    actualPercent={actualPercent}
                    elapsedTime={elapsedTime}
                    taskTimeInSeconds={taskTimeInSeconds}
                    handleStart={this.handleStart}
                    handleStop={this.handleStop}
                    start={this.start}
                    stop={this.stop}
                    forceStop={this.forceStop}
                    togglePause={this.togglePause}
                    repause={this.repause}
                    setEndTime={this.setEndTime}
                    setRemainingTime={this.setRemainingTime}
                    setElapsedTime={this.setElapsedTime}
                    setActualPercent={this.setActualPercent}
                    onConfirm={this.handleEdit}
                />
            </>
        );
    }
}

function TimeboxEditor(props) {
    const {
        title,
        taskTimeInSeconds,
        isRunning,
        isEditable,
        onChangeTitle,
        onChangeTaskTime,
        onConfirm
        // handleStart
    } = props;

    return (
        <div
            className={isEditable ? "TimeboxEditor" : "TimeboxEditor inactive"}
        >
            <label htmlFor="taskInput">Co robisz?</label>
            <input
                id="taskInput"
                onChange={onChangeTitle}
                type="text"
                defaultValue={title}
            />
            <br />
            <label htmlFor="timeInput">Ile minut?</label>
            <input
                id="timeInput"
                onChange={onChangeTaskTime}
                type="number"
                defaultValue={taskTimeInSeconds}
            />
            <br />
            <button disabled={!isEditable} onClick={onConfirm}>
                Zatwierdź zmiany
            </button>
        </div>
    );
}

function CurrentTimebox(props) {
    const {
        title,
        isRunning,
        isPaused,
        isEditable,
        pausesCount,
        initialTime,
        actualTime,
        taskTimeInMs,
        endTime,
        remainingTime,
        actualPercent,
        taskTimeInSeconds,
        handleStart,
        handleStop,
        start,
        stop,
        forceStop,
        togglePause,
        repause,
        setEndTime,
        setRemainingTime,
        setElapsedTime,
        setActualPercent,
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
            />
            <ProgressBar
                className={isPaused ? "inactive" : ""}
                percent={actualPercent}
                trackRemaining={false}
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

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            // {title: "Ucze się formularzy", taskTime: 15},
            // {title: "Ucze się list", taskTime: 10},
            // {title: "Ucze się komponentów niekontrolowanych", taskTime: 5}
        ],
        editInput: ""
    };

    handleCreate = createdTimebox => {
        this.addTimebox(createdTimebox);
    };

    addTimebox = timebox => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return {
                //OR JUST timeboxes
                timeboxes: timeboxes
            };
        });
    };
    //TODO find another way to create this function
    removeTimebox = indexToRemove => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter(
                (timebox, index) => index !== indexToRemove
            );
            return {
                timeboxes: timeboxes
            };
        });
    };

    updateArray = (array, index, value) => {
        array.splice(index, 1);
        array.splice(index, 0, value);
        return array;
    };

    //TODO: refactor editing title

    editTimebox = (indexToChange, contentToChange) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes;
            this.updateArray(timeboxes, indexToChange, contentToChange);
            return {
                timeboxes: timeboxes,
                editInput: ""
            };
        });
    };

    changeTitle = e => {
        this.setState({
            editInput: e.target.value
        });
    };

    render() {
        const { timeboxes, editInput } = this.state;
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                {timeboxes.map((timebox, index) => (
                    <Timebox
                        key={timebox.id}
                        title={timebox.title}
                        taskTime={timebox.taskTime}
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={() =>
                            this.editTimebox(index, {
                                ...timebox,
                                title: editInput
                            })
                        }
                        onChange={this.changeTitle}
                    />
                ))}
            </>
        );
    }
}

class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
    }

    handleSubmit = e => {
        const { onCreate } = this.props;
        e.preventDefault();
        onCreate({
            id: uuid.v4(),
            title: this.form.current.children.taskInput.value,
            taskTime: this.form.current.children.timeInput.value
        });
        this.form.current.children.taskInput.value = "";
        this.form.current.children.timeInput.value = "";
    };

    render() {
        return (
            <form
                ref={this.form}
                onSubmit={this.handleSubmit}
                className="TimeboxCreator"
            >
                <label htmlFor="taskInput">Co robisz?</label>
                <input id="taskInput" type="text" />
                <br />
                <label htmlFor="timeInput">Ile minut?</label>
                <input id="timeInput" type="number" />
                <br />
                <button> Dodaj Timebox'a</button>
            </form>
        );
    }
}

function Timebox({ title, taskTime, onDelete, onEdit, index, onChange }) {
    return (
        <div className="Timebox">
            <h3>
                {title} - {taskTime} min.
            </h3>
            <button onClick={onDelete}>Usuń</button>
            <button onClick={onEdit}>Zmień</button>
            <input onChange={onChange} />
        </div>
    );
}

export { EditableTimebox, TimeboxList };