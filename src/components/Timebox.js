import React from "react";

function Timebox({ title, taskTime, onDelete, onEdit, index, onChange }) {
    if (taskTime <= 0) {
        throw new Error("Czas zadania musi być większy niż zero");
    }

    return (
        <div className="Timebox">
            <h3>
                {title} - {taskTime} min.
            </h3>
            <button onClick={onDelete}>Usuń</button>
            <button onClick={onEdit}>Zmień</button>
            <input onChange={onChange} />
        </div>
    );
}

export default Timebox;
