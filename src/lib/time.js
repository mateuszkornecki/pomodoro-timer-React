const reworkTime = value => {
    const fullSec = Math.floor(value);
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value / 60) >= 60 ? Math.floor(value / 60) - 60 : Math.floor(value / 60);
    // const minutes = Math.floor(value / 60) === 60 ? 0 : Math.floor(value / 60)
    const seconds = Math.floor(value % 60);
    //to prevent counting after passing 0
    const miliseconds = fullSec >= 0 ? Math.floor((value - fullSec) * 1000) : 0;
    // return(hours, minutes, seconds, ms);
    return [hours, minutes, seconds, miliseconds];
};

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



export { reworkTime, normalizeTime };