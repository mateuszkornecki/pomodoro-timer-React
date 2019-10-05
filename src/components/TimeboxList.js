import React from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";
import uuid from "uuid";

//simulating delay of server
function wait(ms = 1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}

function findIndexByAnId(id) {
    const result = timeboxes.findIndex((timebox) => timebox.id === id);
    if (result < 0) {
        throw new Error("Timebox o podanym id nie istnieje");
    }
    return result;
}
const timeboxes = [
    { "id": 1, title: "Ucze się formularzy", taskTime: 15 },
    { "id": 2, title: "Ucze się list", taskTime: 10 },
    { "id": 3, title: "Ucze się komponentów niekontrolowanych", taskTime: 5 }
]
const TimeboxesAPI = {
    getAllTimeboxes: async function () {
        await wait(5000);
        // throw new Error('Opps, something went wrong!!');
        //! Pytanie na live, nie rozumiem dlaczego po przerobieniu timeboxes na ...timeboxes pojawia się jeden element a wcześniej pojawiały się dwa
        return [...timeboxes]
    },
    addTimebox: async function (timeboxToAdd) {
        await wait(1000);
        const addedTimebox = { id: uuid.v4(), ...timeboxToAdd };
        timeboxes.push(addedTimebox)
        return addedTimebox;
    },
    //?? TO WSZYSTKO SPROWADZA SIĘ DO JEDNEGO, PODMIENIA OBIEKT Z TABLICY OBIEKTÓW NA OBIEKT Z ARGUMENTÓW BAZUJĄC NA INDEXIE
    replaceTimebox: async function (timeboxToReplace) {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Cannot replace timebox without an id.")
        }
        const index = findIndexByAnId(timeboxToReplace.id);
        const replacedTimebox = { ...timeboxToReplace };
        timeboxes[index] = replacedTimebox;
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
        await wait(1000);
        if (!timeboxToRemove.id) {
            throw new Error("Cannot remove timebox without an id.")
        }
        const index = findIndexByAnId(timeboxToRemove.id);
        timeboxes.splice(index, 1);
    }
}

class TimeboxList extends React.Component {
    state = {
        timeboxes: [],
        editInput: "",
        hasError: false,
        loadingError: false,
        loading: true,
    };

    //! Pytanie na live, dlaczego () => this.setState({...}), a nie po prostu this.setState po co ta funkcja i dlaczego jak jej nie ma to stan jest odrazu ustawiony na false..
    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes().then(
            (timeboxes) => this.setState({ timeboxes })
        ).catch(
            (error) => {
                console.log(`Wystąpił błąd : ${error}`);
                this.setState({ loadingError: true });
            }
        ).finally(
            () => this.setState({ loading: false })
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

        TimeboxesAPI.addTimebox(timebox).then(
            (addedTimebox) => this.setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return {
                    //OR JUST timeboxes
                    timeboxes: timeboxes
                };
            })
        )

    };

    removeTimebox = indexToRemove => {
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove])
            .then(() => {
                this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.filter(
                        (timebox, index) => index !== indexToRemove
                    );
                    return {
                        timeboxes: timeboxes
                    };
                });
            })
    };

    updateArray = (array, index, value) => {
        array.splice(index, 1);
        array.splice(index, 0, value);
        return array;
    };

    editTimebox = (indexToChange, timeboxToEdit) => {
        TimeboxesAPI.replaceTimebox(timeboxToEdit)
            .then(() => {
                this.setState(prevState => {
                    const timeboxes = prevState.timeboxes;
                    this.updateArray(timeboxes, indexToChange, timeboxToEdit);
                    return {
                        timeboxes: timeboxes,
                        editInput: ""
                    };
                });
            }
            )
        console.log(timeboxes);

    };

    changeTitle = e => {
        this.setState({
            editInput: e.target.value
        });
    };

    render() {
        const { timeboxes, editInput, hasError, loading, loadingError } = this.state;
        return (
            <>
                <ErrorMessage hasError={hasError} message="timebox creator przestał działać">
                    <TimeboxCreator onCreate={this.handleCreate} />
                </ErrorMessage>
                <ErrorMessage hasError={loadingError} message="Nie udało się załadować timeboxów">
                    <h2>{loading ? "loading timeboxes..." : null}</h2>
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
                </ErrorMessage>
            </>
        );
    }
}

export default TimeboxList;
