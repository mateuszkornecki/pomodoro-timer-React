import React from "react";
import { TimeboxList } from "./remaining-component.js";
import EditableTimebox from "./EditableTimebox";

function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EditableTimebox />
        </div>
    );
}

export default App;
