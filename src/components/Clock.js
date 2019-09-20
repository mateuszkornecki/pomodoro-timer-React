import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';

function Clock({ className, hours, minutes, seconds, miliseconds, coloredNumbers }) {

    let clockNumberClassName = classNames(
        "clock__numbers",
        { "clock__numbers--colored": coloredNumbers }
    )

    function timeInterval(min, max, value) {
        //It will return a number between min and max
        value = Math.max(min, Math.min(value, max));
        return value;
    }

    function fillWithZeros(targetLength, value) {
        //It will add zeros  before value till value.length = targetLength
        value = value.toString();
        while (value.length < targetLength) {
            value = `0${value}`;
        }
        return value;
    }

    function normalizeTime(min, max, targetLength, value) {
        return fillWithZeros(targetLength, timeInterval(min, max, value));
    }

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
    className: "Clock",
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,

}

Clock.propTypes = {
    className: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    miliseconds: PropTypes.number.isRequired
}

export default Clock;
