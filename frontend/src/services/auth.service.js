import api from "../api";

class AuthServices {
  async login(email, password) {
    const data = await api().post("auth/signin", { email, password });
    const user = data.data;
    localStorage.setItem("auth", JSON.stringify(user));
    return user;
  }

  logout() {
    localStorage.clear();
  }

  getUser() {
    return JSON.parse(localStorage.getItem("auth"));
  }
}

export default new AuthServices();
