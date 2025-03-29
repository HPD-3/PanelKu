export async function responsive() {
    document.addEventListener("DOMContentLoaded", function () {
        const sidebar = document.querySelector(".sidebar");
        const mainContent = document.querySelector(".main-content");

        // Membuat div baru untuk tombol hamburger di dalam main-content
        const hamburgDiv = document.createElement("div");
        hamburgDiv.classList.add("hamburg");

        // Membuat tombol hamburger
        const toggleButton = document.createElement("button");
        toggleButton.innerHTML = "&#9776;";
        toggleButton.classList.add("toggle-btn");

        // Membuat tombol close
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("close-btn");
        closeButton.style.display = "none";

        // Menambahkan tombol ke dalam div .hamburg
        hamburgDiv.appendChild(toggleButton);
        hamburgDiv.appendChild(closeButton);

        // Menambahkan .hamburg ke dalam main-content
        mainContent.insertBefore(hamburgDiv, mainContent.firstChild);

        // Event listener untuk membuka sidebar
        toggleButton.addEventListener("click", function () {
            sidebar.classList.toggle("active");
            toggleButton.style.display = "none";
            closeButton.style.display = "block";
        });

        // Event listener untuk menutup sidebar
        closeButton.addEventListener("click", function () {
            sidebar.classList.remove("active");
            toggleButton.style.display = "block";
            closeButton.style.display = "none";
        });
    });
}
