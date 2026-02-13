document.addEventListener("DOMContentLoaded", () => {
const button = document.getElementById("toggleButton");
const message = document.getElementById("hiddenMessage");
button.addEventListener("click", () => {
if (message.classList.contains("hidden")) {
message.classList.remove("hidden");
message.classList.add("visible");
button.textContent = "Ocultar Mensaje";
} else {
message.classList.remove("visible");
message.classList.add("hidden");
button.textContent = "Mostrar Mensaje";
}
});
});