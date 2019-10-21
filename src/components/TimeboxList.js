import React, { Suspense } from "react";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";
import TimeboxesAPI from "../api/AxiosTimeboxesApi"
import AuthenticationContext from "../context/AuthenticationContext";
const Timebox = React.lazy(() => import("./Timebox"));


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
        TimeboxesAPI.setAccessToken(this.context.accessToken);
        TimeboxesAPI.getAllTimeboxes(this.context.accessToken).then(
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
            this.addTimebox(createdTimebox, this.context.accessToken);
        }
        catch (error) {
            console.log("metoda addTimebox wyrzuciła błąd");
            this.setState({ hasError: true });
        }

    };

    addTimebox = timebox => {
        // throw new Error("wystąpił błąd podczas dodawania timeboxa");

        TimeboxesAPI.addTimebox(timebox, this.context.accessToken).then(
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
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove], this.context.accessToken)
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
                                <Suspense fallback={<div>Loading...</div>}>
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
                                </Suspense>
                            </ErrorBoundary>
                        ))
                    }
                </ErrorMessage>
            </>
        );
    }
}

TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;
