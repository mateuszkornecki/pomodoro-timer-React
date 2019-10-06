
const FetchTimeboxesAPI = {
    getAllTimeboxes: async function () {
        const response = await fetch("http://localhost:4000/timeboxes");
        if (!response.ok) {
            throw new Error("Something went wrong!...");
        }
        const timeboxes = await response.json();
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd) {
        const response = await fetch("http://localhost:4000/timeboxes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timeboxToAdd)
        });
        if (!response.ok) {
            throw new Error("Something went wrong!...");
        }
        const addedTimebox = await response.json();
        return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace) {
        if (!timeboxToReplace.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const response = await fetch(`http://localhost:4000/timeboxes/${timeboxToReplace.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timeboxToReplace)
        });
        if (!response.ok) {
            throw new Error("Something went wrong!...");
        }
        const replacedTimebox = await response.json();
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const response = await fetch(`http://localhost:4000/timeboxes/${timeboxToRemove.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timeboxToRemove)
        });
        if (!response.ok) {
            throw new Error("Something went wrong!...");
        }
        const removedTimebox = await response.json();
        return removedTimebox;
    }

}

export default FetchTimeboxesAPI;