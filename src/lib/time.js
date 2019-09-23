const reworkTime = value => {
    const fullSec = Math.floor(value);
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value / 60) >= 60 ? Math.floor(value / 60) - 60 : Math.floor(value / 60);
    // const minutes = Math.floor(value / 60) === 60 ? 0 : Math.floor(value / 60)
    const seconds = Math.floor(value % 60);
    //to prevent counting after passing 0
    const miliseconds = fullSec >= 0 ? Math.floor((value - fullSec) * 1000) : 0;
    // return(hours, minutes, seconds, ms);
    //! update it >> michal, return array and destructurize it later
    return [hours, minutes, seconds, miliseconds];
    console.log(reworkTime)
};

export { reworkTime };