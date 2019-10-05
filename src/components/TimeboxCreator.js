import React from "react";


class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
    }

    handleSubmit = e => {
        const { onCreate } = this.props;
        e.preventDefault();
        onCreate({
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

export default TimeboxCreator;
