import './styles.css';
import { loadDashboard } from './dashboard.js';
loadDashboard();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm"); // Ambil form dengan ID

    if (!form) {
        console.error("Elemen form tidak ditemukan! Periksa HTML.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("Email")?.value; 
        const password = document.getElementById("Password")?.value;

        if (email === "admin@example.com" && password === "password123") {
            alert("Login berhasil! Anda akan diarahkan ke dashboard.");
            window.location.href = "dashboard.html"; 
        } else {
            alert("Email atau password salah. Coba lagi.");
        }
    });
});
