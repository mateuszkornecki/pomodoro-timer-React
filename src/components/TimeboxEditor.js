import React from "react";

class TimeboxEditor extends React.Component {

    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.taskTimeInput = React.createRef();
    }

    componentWillUnmount() {
        console.log([this.titleInput.current.value, this.taskTimeInput.current.value]);
        console.count("unmounted component");
    }

    handleConfirmation = e => {
        console.log(typeof this.taskTimeInput.current.value);
        const { onConfirmation } = this.props;
        //!need to learn about that
        e.preventDefault();
        onConfirmation(this.titleInput.current.value, parseInt(this.taskTimeInput.current.value))
    }

    render() {
        const {
            title,
            taskTimeInSeconds,
            isEditable,
        } = this.props;

        return (
            <div
                className={isEditable ? "TimeboxEditor" : "TimeboxEditor inactive"}
            >
                <label htmlFor="taskInput">Co robisz?</label>
                <input
                    id="taskInput"
                    type="text"
                    defaultValue={title}
                    ref={this.titleInput}
                />
                <br />
                <label htmlFor="timeInput">Ile minut?</label>
                <input
                    id="timeInput"
                    type="number"
                    defaultValue={taskTimeInSeconds / 60}
                    ref={this.taskTimeInput}
                />
                <br />
                <button disabled={!isEditable} onClick={this.handleConfirmation}>
                    Zatwierdź zmiany
            </button>
            </div>
        );
    }
}

export default TimeboxEditor;
