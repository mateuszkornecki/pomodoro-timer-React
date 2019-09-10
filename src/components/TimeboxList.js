import React from "react";
import { TimeboxCreator, Timebox } from "./remaining-component.js";

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

export default TimeboxList;
