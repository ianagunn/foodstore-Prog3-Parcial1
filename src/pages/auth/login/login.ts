import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";
import { getUsers, saveUser } from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const usuarioEncontrado = getUsers().find(
    (u) => u.email === valueEmail && u.password === valuePassword
  );

  if (!usuarioEncontrado) {
    alert("Email o contraseña incorrectos");
    return;
  }

  const user: IUser = {
      ...usuarioEncontrado,
      loggedIn: true,
  };

  saveUser(user);

  if (user.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});
