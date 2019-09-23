import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { normalizeTime } from '../lib/time'

function Clock({ className, hours, minutes, seconds, miliseconds, coloredNumbers }) {

    let clockNumberClassName = classNames(
        "clock__numbers",
        { "clock__numbers--colored": coloredNumbers }
    )

    hours = normalizeTime(0, 24, 2, hours);
    minutes = normalizeTime(0, 59, 2, minutes >= 60 ? minutes % 60 : minutes);
    seconds = normalizeTime(0, 59, 2, seconds);
    miliseconds = normalizeTime(0, 999, 3, miliseconds);

    return (
        <h2 className={"clock " + className}>
            {" "}
            Pozostało <mark className={clockNumberClassName}>{hours}</mark>:
            <mark className={clockNumberClassName}>{minutes}</mark>:
            <mark className={clockNumberClassName}>{seconds}</mark>:
            <mark className={clockNumberClassName}>{miliseconds}</mark>
        </h2>
    );
}

Clock.defaultProps = {
    className: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,

}

Clock.propTypes = {
    className: PropTypes.string,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    miliseconds: PropTypes.number.isRequired
}

export default Clock;
