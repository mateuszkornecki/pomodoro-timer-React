import React from "react";
import classNames from "classnames";

function ProgressBar({ className = "", percent, trackRemaining, barColor }) {
    let progressClassName = classNames(
        "progress",
        className,
        { "progress--reverse": trackRemaining }
    );

    function checkColor(colorName) {
        if (barColor === colorName) return true
    }

    let progressBarClassName = classNames(
        "progress__bar",
        {
            "progress__bar--red": checkColor("red"),
            "progress__bar--blue": checkColor("blue"),
            "progress__bar--green": checkColor("green")
        }
    )

    const ProgressBarWidth =
        trackRemaining === true ? `calc(100 % - ${percent} %)` : `${percent}% `;

    return (
        <div className={progressClassName}>
            <div className={progressBarClassName} style={{ width: `${ProgressBarWidth} ` }}></div>
        </div>
    );
}

function isNumberBetweenRange(props, propName, componentName) {
    if (typeof props[propName] !== "number") {
        return new Error(`${propName} has to be number!`);
    } else if (parseInt(props[propName], 10) > 100 || parseInt(props[propName], 10) < 0) {
        return new Error(`An error in ${componentName}, ${propName} has to be between 10 and 50 and now it is equal to ${props[propName]}`);
    }
}

ProgressBar.propTypes = {
    percent: isNumberBetweenRange
}

export default ProgressBar;
