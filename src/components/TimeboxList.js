import React from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";

function wait(ms = 1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}

const getAllTimeboxes = async () => {
    await wait(2000);
    return [
        { "id": 1, title: "Ucze się formularzy", taskTime: 15 },
        { "id": 2, title: "Ucze się list", taskTime: 10 },
        { "id": 3, title: "Ucze się komponentów niekontrolowanych", taskTime: 5 }
    ]
}

class TimeboxList extends React.Component {
    state = {
        timeboxes: [

        ],
        editInput: "",
        hasError: false
    };

    //simulating delay of server




    componentDidMount() {
        getAllTimeboxes().then(
            (timeboxes) => this.setState({ timeboxes })
        )
    }


    handleCreate = createdTimebox => {
        try {
            this.addTimebox(createdTimebox);
        }
        catch (error) {
            console.log("metoda addTimebox wyrzuciła błąd");
            this.setState({ hasError: true });
        }

    };

    addTimebox = timebox => {
        // throw new Error("wystąpił błąd podczas dodawania timeboxa");
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return {
                //OR JUST timeboxes
                timeboxes: timeboxes
            };
        });
    };

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
        const { timeboxes, editInput, hasError } = this.state;
        return (
            <>
                <ErrorMessage hasError={hasError} message="metoda addTimebox() rzuciła wyjątek">
                    <TimeboxCreator onCreate={this.handleCreate} />
                </ErrorMessage>
                {
                    timeboxes.map((timebox, index) => (
                        <ErrorBoundary key={timebox.id} message="Coś się wywaliło w Timeboxie">
                            <Timebox
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
                        </ErrorBoundary>
                    ))
                }

            </>
        );
    }
}

export default TimeboxList;
