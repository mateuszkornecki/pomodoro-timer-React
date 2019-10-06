import uuid from "uuid";

//simulating delay of server
function wait(ms = 1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}

function findIndexByAnId(id) {
    const result = timeboxes.findIndex((timebox) => timebox.id === id);
    if (result < 0) {
        throw new Error("Timebox o podanym id nie istnieje");
    }
    return result;
}
const timeboxes = [
    { "id": 1, title: "Ucze się formularzy", taskTime: 15 },
    { "id": 2, title: "Ucze się list", taskTime: 10 },
    { "id": 3, title: "Ucze się komponentów niekontrolowanych", taskTime: 5 }
]
const FakeTimeboxesAPI = {
    getAllTimeboxes: async function () {
        await wait(1000);
        // throw new Error('Opps, something went wrong!!');
        //! Pytanie na live, nie rozumiem dlaczego po przerobieniu timeboxes na ...timeboxes pojawia się jeden element a wcześniej pojawiały się dwa
        console.log(`GET all`, timeboxes);
        return [...timeboxes]
    },
    addTimebox: async function (timeboxToAdd) {
        await wait(1000);
        const addedTimebox = { id: uuid.v4(), ...timeboxToAdd };
        timeboxes.push(addedTimebox)
        console.log(`POST add`, timeboxes);
        return addedTimebox;
    },
    //?? TO WSZYSTKO SPROWADZA SIĘ DO JEDNEGO, PODMIENIA OBIEKT Z TABLICY OBIEKTÓW NA OBIEKT Z ARGUMENTÓW BAZUJĄC NA INDEXIE
    replaceTimebox: async function (timeboxToReplace) {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Cannot replace timebox without an id.")
        }
        const index = findIndexByAnId(timeboxToReplace.id);
        const replacedTimebox = { ...timeboxToReplace };
        timeboxes[index] = replacedTimebox;
        console.log(`PUT change`, timeboxes);
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
        await wait(1000);
        if (!timeboxToRemove.id) {
            throw new Error("Cannot remove timebox without an id.")
        }
        const index = findIndexByAnId(timeboxToRemove.id);
        console.log(`DELETE remove`, timeboxes);
        timeboxes.splice(index, 1);
    },
    partiallyUpdateTimebox: async function (timeboxToUpdate) {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Cannot replace timebox without an id.")
        }
        const index = findIndexByAnId(timeboxToUpdate.id);
        const initialTimebox = timeboxes[index];
        if (timeboxToUpdate.title != initialTimebox.title) {

        }
        const updatedTimebox = { ...initialTimebox };
    }
}

export default FakeTimeboxesAPI;