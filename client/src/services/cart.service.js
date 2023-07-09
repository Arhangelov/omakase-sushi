const url = "https://omakase-sushi-api.vercel.app/cart";

export const addToCartService = async ( sushiProduct, userEmail ) => {
    return fetch( url + `/addtocart`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ ...sushiProduct, userEmail })
    }).then(res => res.json());
}