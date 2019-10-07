import React from "react";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary message="wystąpił błąd całej aplikacji" >
                <div className="App">
                    <header className="header">
                        Witaj test01@gmail.com.
                <a className="header__logout-link" href="#">Wyloguj</a>

                    </header>
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
