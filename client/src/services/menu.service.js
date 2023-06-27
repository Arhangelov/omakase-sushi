const url = "https://omakase-sushi-api.vercel.app/menu";

export const getSushiType = async ( sushiType ) => {
    return fetch( url + `/${sushiType}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    }).then(res => res.json());
}