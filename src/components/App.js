import React from "react";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
class App extends React.Component {


	getUserEmail = () => {
		return "test01@gmail.com";
	}

	handleLogout = () => {
		console.log("handling logout");
	}

	handleLoginAttempt = (credentials) => {
		console.log("handling login attempt", credentials);
	}

	isUserLoggedIn = () => {
		return false;
	}

	render() {
		return (
			<ErrorBoundary message="wystąpił błąd całej aplikacji" >
				<div className="App">
					{
						this.isUserLoggedIn()
							?
							<>
								<header className="header">
									Witaj test01@gmail.com.
                                    <a className="header__logout-link" href="#">
										Wyloguj
                                    </a>
								</header>
							</>
							: <LoginForm
								errorMessage="Nie udało się zalogować!"
								onLoginAttempt={this.handleLoginAttempt} />
					}
					<TimeboxList />
					<ErrorBoundary message="wystąpił błąd komponentu EditableTimebox">
						<EditableTimebox />
					</ErrorBoundary>
				</div>
			</ErrorBoundary>
		);
	}
}

export default App;
