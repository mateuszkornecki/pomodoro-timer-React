import React from "react";
import classNames from "classnames";

function ProgressBar({ className = "", percent, trackRemaining, red }) {
    let progressClassName = classNames(
        "progress",
        className,
        { "progress--reverse": trackRemaining }
    );

    let progressBarClassName = classNames(
        "progress__bar",
        { "progress__bar--red": red, }
    )

    // const ProgressBarClasses =
    //     trackRemaining === true
    //         ? `progress progress--reverse ${className}`
    //         : `progress ${className}`;

    const ProgressBarWidth =
        trackRemaining === true ? `calc(100 % - ${percent} %)` : `${percent}% `;

    return (
        <div className={progressClassName}>
            <div className={progressBarClassName} style={{ width: `${ProgressBarWidth} ` }}></div>
        </div>
    );
}

export default ProgressBar;
