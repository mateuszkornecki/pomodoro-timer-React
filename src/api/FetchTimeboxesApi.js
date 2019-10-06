
const FetchTimeboxesAPI = {
    getAllTimeboxes: async function () {
        const response = await fetch("http://localhost:4000/timeboxes");
        const timeboxes = await response.json();
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd) {

        return {};
    },
    replaceTimebox: async function (timeboxToReplace) {

        return {};
    },
    removeTimebox: async function (timeboxToRemove) {

        return {};
    }

}

export default FetchTimeboxesAPI;