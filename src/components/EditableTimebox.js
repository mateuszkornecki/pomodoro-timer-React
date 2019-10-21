import React, { useState } from "react";

import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

function EditableTimebox(props) {

    const [state, setState] = useState({
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
    })

    const handleChangeTitle = (title) => {
        setState({
            title: title
        });
    };

    const handleChangeTaskTime = (taskTime) => {
        const { elapsedTime } = state;
        setState({
            //* 60 to convert minutes to seconds
            taskTimeInSeconds: taskTime * 60,
            taskTimeInMs: taskTime * 60 * 1000
        });
        //elapsedTime>0 mean that program is running or it is paused
        if (elapsedTime > 0) {
            handleChangeTaskTimeWhileRunning();
        }
    };

    const handleChangeTaskTimeWhileRunning = () => {
        //needed to edit taskTime while counting down!
        setState(state => ({
            taskTimeInMs: state.taskTimeInMs - state.elapsedTime * 1000
        }));
        setEndTime();
        setRemainingTime();
    };

    const handleStart = () => {
        const initialTime = Date.now();
        setState({
            isRunning: true,
            initialTime: initialTime
        });
        start();
        setEndTime();
    };
    const handleStop = () => {
        stop();
        const { taskTimeInSeconds } = this.state;
        setState({
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

    const handleEdit = () => {

        setState(function (prevState) {
            const isEditable = !prevState.isEditable;
            return {
                isEditable: isEditable
            };
        });
    };

    const handleEditConfirmation = (title, taskTime) => {
        handleEdit();
        handleChangeTitle(title);
        handleChangeTaskTime(taskTime);

    }

    const start = () => {
        this.countDown = setInterval(() => {
            let actualTime = Date.now();
            console.log("timer is working");
            setState({
                actualTime: actualTime
            });
            setRemainingTime();
            setElapsedTime();
            setActualPercent();
            forceStop();
        }, 10);
    };

    const stop = () => {
        clearInterval(this.countDown);
    };

    const forceStop = () => {
        const { remainingTime } = state;
        if (remainingTime <= 0) {
            stop();
        }
    };

    const togglePause = () => {
        setState(function (prevState) {
            const isPaused = !prevState.isPaused;
            return {
                isPaused: isPaused,
                pausesCount: prevState.isPaused
                    ? prevState.pausesCount + 1
                    : prevState.pausesCount
            };
        });
        const { isPaused } = state;
        isPaused ? repause() : stop();
    };

    const repause = () => {
        //create new initialTime, use remainingTime as new taskTimeInMsInMiliseconds
        const { remainingTime } = state;
        const initialTime = Date.now();
        const taskTimeAfterPause = remainingTime * 1000;
        setState({
            isRunning: true,
            initialTime: initialTime,
            taskTimeInMs: taskTimeAfterPause
        });
        start();
        setEndTime();
    };

    const setEndTime = () => {
        setState(function (prevState) {
            let endTime = prevState.initialTime + prevState.taskTimeInMs;
            return {
                endTime: endTime
            };
        });
    };

    const setRemainingTime = () => {
        setState(function (prevState) {
            let remainingTime =
                (prevState.endTime - prevState.actualTime) / 1000;
            return {
                remainingTime: remainingTime
            };
        });
    };

    const setElapsedTime = () => {
        setState(function (prevState) {
            let elapsedTime =
                prevState.taskTimeInSeconds - prevState.remainingTime;
            return {
                elapsedTime: elapsedTime
            };
        });
    };

    const setActualPercent = () => {
        setState(function (prevState) {
            //*1000 to convert seconds to ms and *100 to convert fraction to a full number
            let actualPercent =
                (prevState.elapsedTime / prevState.taskTimeInSeconds) * 100;
            return {
                actualPercent: actualPercent
            };
        });
    };

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
    } = state;

    return (
        <>
            <React.StrictMode>
                {
                    isEditable ? (
                        <TimeboxEditor
                            title={title}
                            taskTimeInSeconds={taskTimeInSeconds}
                            isRunning={isRunning}
                            isEditable={isEditable}
                            elapsedTime={elapsedTime}
                            onChangeTitle={handleChangeTitle}
                            onChangeTaskTime={handleChangeTaskTime}
                            onConfirmation={handleEditConfirmation}
                        />
                    ) : (
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
                                handleStart={handleStart}
                                handleStop={handleStop}
                                start={start}
                                stop={stop}
                                forceStop={forceStop}
                                togglePause={togglePause}
                                repause={repause}
                                setEndTime={setEndTime}
                                setRemainingTime={setRemainingTime}
                                setElapsedTime={setElapsedTime}
                                setActualPercent={setActualPercent}
                                onConfirm={handleEdit}
                            />
                        )
                }
            </React.StrictMode>
        </>
    );
}

export default EditableTimebox;
