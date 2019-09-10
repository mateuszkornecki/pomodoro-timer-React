import React from "react";

import uuid from "uuid";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

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

export { TimeboxList };
