import React from "react";

import uuid from "uuid";

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

export { TimeboxCreator, Timebox };
