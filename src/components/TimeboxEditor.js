import React from "react";

class TimeboxEditor extends React.Component {

    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.taskTimeInput = React.createRef();
        // console.count("constructor");
    }

    componentDidMount() {
        // console.count("mounted component");
    }

    componentDidUpdate() {
        // console.count("updated component");
    }

    componentWillUnmount() {
        // console.count("unmounted component");
    }

    handleConfirmation = e => {
        const { onConfirmation, elapsedTime, taskTimeInSeconds } = this.props;
        if ((this.taskTimeInput.current.value * 60 > elapsedTime) && (this.taskTimeInput.current.value * 60 !== taskTimeInSeconds)) {
            //!need to learn about that
            e.preventDefault();
            onConfirmation(this.titleInput.current.value, this.taskTimeInput.current.value)
        } else {
            alert(`wprowadzony czas nie może byc mniejszy od ${(elapsedTime / 60).toFixed(2)} min. oraz musi być inny niż wprowadzony czas początkowy`);
        }
    }

    render() {
        // console.count("render");
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
