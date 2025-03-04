export default async function retrieveCoins(retries = 3, delay = 1000) {
    try {
        const response = await fetch("https://api.coincap.io/v2/assets", {
            method: "GET",
            redirect: "follow",
        });
    
        if (!response.ok) {
            if (response.status === 429) {
                console.warn("Rate limit exceeded. Retrying in", delay / 1000, "seconds...");
                await new Promise(resolve => setTimeout(resolve, delay));
                return retrieveCoins(retries - 1, delay * 2);
            } else {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
        }
    
        return await response.json();
    } catch (e) {
        console.error("The following error occurred when trying to fetch data: ", e);
    }
}