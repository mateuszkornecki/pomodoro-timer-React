import React from "react";
import PropTypes from 'prop-types';

function Timebox({ title, taskTime, onDelete, onEdit, onChange }) {
    if (taskTime <= 0) {
        throw new Error("Czas zadania musi być większy niż zero");
    }
    const input = React.createRef();
    const clearInput = () => {
        input.current.value = "";
    }

    const handleEdit = () => {
        onEdit();
        clearInput();
    }

    return (
        <div className="Timebox">
            <h3>
                {title} - {taskTime} min.
            </h3>
            <button onClick={onDelete}>Usuń</button>
            <button onClick={handleEdit}>Zmień</button>
            <input ref={input} onChange={onChange} />
        </div>
    );
}

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

Timebox.propTypes = {
    title: stringOrNumber.isRequired,
    taskTime: stringOrNumber.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Timebox;
