import React from "react";

function ProgressBar({ className = "", percent, trackRemaining }) {
    const ProgressBarClasses =
        trackRemaining === true
            ? `ProgressBar ProgressBar--reverse ${className}`
            : `ProgressBar ${className}`;
    const ProgressBarWidth =
        trackRemaining === true ? `calc(100% - ${percent}%)` : `${percent}%`;

    return (
        <div className={ProgressBarClasses}>
            <div style={{ width: `${ProgressBarWidth}` }}></div>
        </div>
    );
}

export default ProgressBar;