import { login } from "./fb/fb.js";

const email = document.querySelector(".mail");
const password = document.querySelector(".mdp");

document.querySelector(".valid").addEventListener("click", () => {
  login(email.value, password.value, "../gest/adminGest.html");
});
