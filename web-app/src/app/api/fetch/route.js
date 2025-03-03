export default async function retrieveCoins() {
    try {
        const response = await fetch("https://api.coincap.io/v2/assets", {
            method: "GET",
            redirect: "follow",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching coins:", error);
        throw error;
    }
}
