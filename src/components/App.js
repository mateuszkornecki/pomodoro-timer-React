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

	getUserEmail = () => {
		console.log()
		const decodedToken = jwt.decode(this.state.accessToken)
		return decodedToken.email;
	}

	handleLogout = () => {
		this.setState({
			accessToken: null,
			previousLoginAttemptFailed: false
		})
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

								<TimeboxList />
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
