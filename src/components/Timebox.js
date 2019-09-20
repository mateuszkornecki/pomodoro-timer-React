import React from "react";
import PropTypes from 'prop-types';

function Timebox({ title, taskTime, onDelete, onEdit, onChange }) {
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

//! homework, apply that to progress bar!
function isNumberBetweenRange(props, propName, componentName) {
    if (typeof props[propName] !== "string") {
        return new Error(`${propName} has to be number!`);
    } else if (parseInt(props[propName], 10) > 100 || parseInt(props[propName], 10) < 10) {
        return new Error(`An error in ${componentName}, ${propName} has to be between 10 and 50 and now it is equal to ${props[propName]}`);
    }
}

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

Timebox.propTypes = {
    title: stringOrNumber.isRequired,
    taskTime: isNumberBetweenRange,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Timebox;
