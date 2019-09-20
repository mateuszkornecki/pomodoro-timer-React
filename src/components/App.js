import React from "react";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";


function App() {
    return (
        <ErrorBoundary message="wystąpił błąd całej aplikacji">
            <div className="App">
                <TimeboxList />
                <ErrorBoundary message="wystąpił błąd komponentu EditableTimebox">
                    <EditableTimebox />
                </ErrorBoundary>
            </div>
        </ErrorBoundary>
    );
}

export default App;
