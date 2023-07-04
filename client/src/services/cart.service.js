const url = "https://omakase-sushi-api.vercel.app/cart";

export const addToCartService = async (productId, userId) => {
    return fetch( url + `/addtocart`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: { productId, userId }
    }).then(res => res.json());
}