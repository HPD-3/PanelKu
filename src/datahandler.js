export async function fetchData() {
    try {
        const response = await fetch("/data.json"); // ✅ Works because Webpack serves `public/`

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Error loading JSON:", error);
        return { labels: [], values: [] };
    }
}