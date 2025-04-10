export async function registerScripts() {

  document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("registerForm");
  
      if (!form) {
          console.error("Elemen form tidak ditemukan! Periksa HTML.");
          return;
      }
  
      form.addEventListener("submit", function (event) {
          event.preventDefault();
  
          const email = document.getElementById("Email")?.value; 
          const password = document.getElementById("Password")?.value;

          alert("Selamat Datang!");
          window.location.href = "dashboard.html";
      });
  });
  }  
