import React from "react";

function Clock({ className, hours, minutes, seconds, miliseconds }) {
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
            Pozostało <mark className="clock__numbers clock__numbers--hours">{hours}</mark>:
            <mark className="clock__numbers clock__numbers--minutes">{minutes}</mark>:
            <mark className="clock__numbers clock__numbers--seconds">{seconds}</mark>:
            <mark className="clock__numbers clock__numbers--miliseconds">{miliseconds}</mark>
        </h2>
    );
}

export default Clock;
