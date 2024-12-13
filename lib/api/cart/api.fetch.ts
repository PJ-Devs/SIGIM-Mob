import APIInstance from "../../axios/axios.config";

const getCart = async () => {
    try {
        const response = await APIInstance.get("/cart/products");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch cart:", error);
        return null;
    }
}

const attachToCart = async (product_id: number, quantity: number) => {
    try {
        const response = await APIInstance.post("/cart/attach-product", {
            product_id: product_id,
            quantity: quantity,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to attach product to cart:", error);
        return null;
    }
}

const detachFromCart = async (product_id: number) => {
    try {
        const response = await APIInstance.post("/cart/detach-product", {
            product_id: product_id,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to detach product from cart:", error);
        return null;
    }
}

const concludeSale = async (payment_method: string, discount: number, client_id: number) => {
    try {
        const response = await APIInstance.post("/cart/conclude-sale", {
            payment_method: payment_method,
            discount: discount,
            client_id: client_id,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to conclude sale:", error);
        return null;
    }
}

export { getCart, attachToCart, detachFromCart, concludeSale };