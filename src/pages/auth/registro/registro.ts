import type { IUser } from "../../../types/IUser";
import { getUsers, saveUsers } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const nuevoUsuario: IUser = {
    email: valueEmail,
    password: valuePassword,
    loggedIn: false,
    role: "client",
  };

  const usuarios = getUsers();
  usuarios.push(nuevoUsuario);
  saveUsers(usuarios);

  navigate("/src/pages/auth/login/login.html");
});
