const url = "https://omakase-sushi-api.vercel.app/auth";

export const registerService = async ( newUser ) => {
    return fetch( url + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newUser })
    }).then(res => res.json());
}