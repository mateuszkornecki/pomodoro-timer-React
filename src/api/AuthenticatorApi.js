const BASE_URL = "http://localhost:5000";
const AuthenticatorAPI = {

    login: async function (credentials) {

        const response = await makeRequest(`${BASE_URL}/login`, "POST", credentials);
        const result = await response.json();
        return result;
    },

}

export default AuthenticatorAPI;

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
    return response;
}