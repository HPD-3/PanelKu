import { fetchData } from "./datahandler.js"; // ✅ Import fungsi fetch

export async function updateAccountName() {
    try {
        const data = await fetchData(); // Ambil data
        const accountName = data.acountname; // Ambil "acountname" (dengan salah ejaan)

        const accountNameElement = document.getElementById("accountname");
        if (accountNameElement) {
            accountNameElement.innerHTML = `<h3>${accountName}</h3>`; 
        } else {
            console.error("Element with id 'accountname' not found.");
        }
    } catch (error) {
        console.error("Error fetching account name:", error);
    }
}
export async function updateBio() {
    try {
        const data = await fetchData(); 
        const accountName = data.bio; 

        const accountNameElement = document.getElementById("bio");
        if (accountNameElement) {
            accountNameElement.innerHTML = `<p>${accountName}</p>`; 
        } else {
            console.error("Element with id 'bio' not found.");
        }
    } catch (error) {
        console.error("Error fetching account name:", error);
    }
}
