import React from "react";

import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

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

    componentWillUnmount() {
        console.count("unmounted componnet");
    }

    handleChangeTitle = (title) => {
        this.setState({
            title: title
        });
    };

    handleChangeTaskTime = (taskTime) => {
        const { elapsedTime } = this.state;
        this.setState({
            //* 60 to convert minutes to seconds
            taskTimeInSeconds: taskTime * 60,
            taskTimeInMs: taskTime * 60 * 1000
        });
        //elapsedTime>0 mean that program is running or it is paused
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

    handleEditConfirmation = (title, taskTime) => {
        this.handleEdit();
        this.handleChangeTitle(title);
        this.handleChangeTaskTime(taskTime);

    }

    start = () => {
        this.countDown = setInterval(() => {
            let actualTime = Date.now();
            console.log("timer is working");
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
        const { remainingTime } = this.state;
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
                {isEditable ? (
                    <TimeboxEditor
                        title={title}
                        taskTimeInSeconds={taskTimeInSeconds}
                        isRunning={isRunning}
                        isEditable={isEditable}
                        elapsedTime={elapsedTime}
                        onChangeTitle={this.handleChangeTitle}
                        onChangeTaskTime={this.handleChangeTaskTime}
                        onConfirmation={this.handleEditConfirmation}
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
                    )
                }
            </>
        );
    }
}

export default EditableTimebox;
