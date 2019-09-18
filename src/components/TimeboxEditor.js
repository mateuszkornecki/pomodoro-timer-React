import React from "react";

function TimeboxEditor(props) {
    const {
        title,
        taskTimeInSeconds,
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
                defaultValue={taskTimeInSeconds / 60}
            />
            <br />
            <button disabled={!isEditable} onClick={onConfirm}>
                Zatwierdź zmiany
            </button>
        </div>
    );
}

export default TimeboxEditor;
