const axios = require('axios');

const BASE_URL = "http://localhost:5000/timeboxes";

const AxiosTimeboxesAPI = {
    getAllTimeboxes: async function () {
        const response = await axios.get(BASE_URL);
        const timeboxes = await response.data;
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd) {
        const response = await axios.post(BASE_URL, timeboxToAdd);
        const addedTimebox = await response.data;
        return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace) {
        if (!timeboxToReplace.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const response = await axios.put(`${BASE_URL}/${timeboxToReplace.id}`, timeboxToReplace);
        const replacedTimebox = await response.data;
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const response = await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`);
        //! no need to return anything, if Promise wont throw error it means that timebox was removed
    }
}

export default AxiosTimeboxesAPI;
