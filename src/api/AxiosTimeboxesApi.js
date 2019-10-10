const axios = require('axios');

const BASE_URL = "http://localhost:5000/timeboxes";

const AxiosTimeboxesAPI = {
    setAccessToken: function (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    },
    getAllTimeboxes: async function (accessToken) {
        console.log("ACCESS TOKEN: ", accessToken);
        const response = await axios.get(BASE_URL);
        const timeboxes = await response.data;
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd, accessToken) {
        const response = await axios.post(BASE_URL, timeboxToAdd);
        const addedTimebox = await response.data;
        return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace, accessToken) {
        if (!timeboxToReplace.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const response = await axios.put(`${BASE_URL}/${timeboxToReplace.id}`, timeboxToReplace);
        const replacedTimebox = await response.data;
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove, accessToken) {
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`);
        //! no need to return anything, if Promise wont throw error it means that timebox was removed
    }
}

export default AxiosTimeboxesAPI;
