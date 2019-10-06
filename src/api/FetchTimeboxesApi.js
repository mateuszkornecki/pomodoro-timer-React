const BASE_URL = "http://localhost:4000/timeboxes";
const FetchTimeboxesAPI = {
    getAllTimeboxes: async function () {
        const timeboxes = makeRequest(BASE_URL, "GET");
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd) {

        const addedTimebox = makeRequest(BASE_URL, "POST", timeboxToAdd);
        return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace) {
        const replacedTimebox = makeRequest(`${BASE_URL}/${timeboxToReplace.id}`, "PUT", timeboxToReplace);
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const removedTimebox = makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE", timeboxToRemove);
        return removedTimebox;
    }
}

export default FetchTimeboxesAPI;

async function makeRequest(url, method, body) {
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonBody
    })
    if (!response.ok) {
        throw new Error("Something went wrong!...");
    }
    return await response.json();
}