import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticatorAPI from "../api/AuthenticatorApi";
import jwt from "jsonwebtoken";

import AuthenticatedApp from "./AuthenticatedApp";
import AuthenticationContext from "../context/AuthenticationContext";
class App extends React.Component {

    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    componentDidMount() {
        this.getAccessTokenFromLocalStorage();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setTimerOnLogIn = () => {
        const sessionTimeInSeconds = 3600
        const timeToLogOut = Date.now() + sessionTimeInSeconds * 1000;
        this.interval = setInterval(() => {
            const actualTime = Date.now()
            if (timeToLogOut - actualTime <= 0) {
                this.handleLogout();
            }
        }, 60000)
    }

    clearTimeOnLogOut = () => {
        clearInterval(this.interval);
    }

    getUserEmail = () => {
        const decodedToken = jwt.decode(this.state.accessToken)
        return decodedToken.email;
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false
        });
        this.removeAccessTokenFromLocalStorage();
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

    setAccessTokenToLocalStorage = () => {
        if (this.state.accessToken) {
            localStorage.setItem('timeboxing-access-token', this.state.accessToken);
            const localStorageAccessToken = localStorage.getItem('timeboxing-access-token');
        }
    }

    getAccessTokenFromLocalStorage = () => {
        const localStorageAccessToken = localStorage.getItem('timeboxing-access-token');
        if (localStorageAccessToken) {
            this.setState({
                accessToken: localStorageAccessToken
            })
        }
    }

    removeAccessTokenFromLocalStorage = () => {
        localStorage.removeItem('timeboxing-access-token');

    }

    isUserLoggedIn = () => {
        //when user is logged in store accessToken in localStorage
        this.setAccessTokenToLocalStorage();
        if (this.state.accessToken) {
            this.setTimerOnLogIn();
        } else this.clearTimeOnLogOut();

        return this.state.accessToken ? true : false;
    }

    render() {
        return (
            <div className="App">
                <ErrorBoundary message="wystąpił błąd całej aplikacji" >

                    {
                        this.isUserLoggedIn() ?
                            <AuthenticationContext.Provider value={{ accessToken: this.state.accessToken }}>
                                <AuthenticatedApp onLogout={this.handleLogout} />
                            </AuthenticationContext.Provider>
                            :
                            <LoginForm
                                errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować!" : null}
                                onLoginAttempt={this.handleLoginAttempt}
                            />

                    }
                </ErrorBoundary>
            </div >

        );
    }
}

export default App;
