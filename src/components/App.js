import React from "react";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";

function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EditableTimebox />
        </div>
    );
}

export default App;
