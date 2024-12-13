import APIInstance from "../../axios/axios.config";

const getInvoices = async () => {
    try {
        const response = await APIInstance.get("/invoices/get-invoices");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch invoices:", error);
        return null;
    }
}

export { getInvoices };