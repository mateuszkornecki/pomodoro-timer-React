import React from "react";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";


function App() {
    return (
        <ErrorBoundary message="wywaliło App">
            <div className="App">
                <TimeboxList />
                <ErrorBoundary message="wywaliło EditableTimebox">
                    <EditableTimebox />
                </ErrorBoundary>
            </div>
        </ErrorBoundary>
    );
}

export default App;
