import React from "react";

function ProgressBar({ className, percent, trackRemaining }) {
    const ProgressBarClasses =
        trackRemaining === true
            ? `progress progress--reverse ${className}`
            : `progress ${className}`;
    const ProgressBarWidth =
        trackRemaining === true ? `calc(100 % - ${percent} %)` : `${percent}% `;

    return (
        <div className={ProgressBarClasses}>
            <div className="progress__bar progress__bar--red" style={{ width: `${ProgressBarWidth} ` }}></div>
        </div>
    );
}

export default ProgressBar;
