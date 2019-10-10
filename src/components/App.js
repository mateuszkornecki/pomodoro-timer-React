import React from "react";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticatorAPI from "../api/AuthenticatorApi";
import jwt from "jsonwebtoken";
class App extends React.Component {

    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    componentDidMount() {
        const localStorageAccessToken = localStorage.getItem('timeboxing-access-token');
        if (localStorageAccessToken) {
            this.setState({
                accessToken: localStorageAccessToken
            })
        }
    }

    getUserEmail = () => {
        console.log()
        const decodedToken = jwt.decode(this.state.accessToken)
        return decodedToken.email;
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false
        });
        localStorage.removeItem('timeboxing-access-token');
    }

    handleLoginAttempt = (credentials) => {
        AuthenticatorAPI.login(credentials)
            .then(({ accessToken }) => {
                this.setState({
                    accessToken: accessToken,
                    previousLoginAttemptFailed: false
                })
            })
            .catch(() => {
                this.setState({
                    previousLoginAttemptFailed: true
                })
            })
    }

    isUserLoggedIn = () => {
        //when user is logged in store accessToken in localStorage
        if (this.state.accessToken) {
            localStorage.setItem('timeboxing-access-token', this.state.accessToken);
            const localStorageAccessToken = localStorage.getItem('timeboxing-access-token');
            console.log(typeof localStorageAccessToken);
        }
        return this.state.accessToken ? true : false;
    }

    render() {
        return (
            <ErrorBoundary message="wystąpił błąd całej aplikacji" >
                {
                    this.isUserLoggedIn()
                        ?
                        <>
                            <header className="header">
                                Witaj {this.getUserEmail()}
                                <a className="header__logout-link" onClick={this.handleLogout} href="#">
                                    Wyloguj
                           </a>
                            </header>



                            <div className="App">

                                <TimeboxList accessToken={this.state.accessToken} />
                                <ErrorBoundary message="wystąpił błąd komponentu EditableTimebox">
                                    <EditableTimebox />
                                </ErrorBoundary>
                            </div>
                        </>
                        : <LoginForm
                            errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować!" : null}
                            onLoginAttempt={this.handleLoginAttempt} />
                }
            </ErrorBoundary>
        );
    }
}

export default App;
