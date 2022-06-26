import api from "../api";
import authHeader from "./auth.header";

class UserService {
  getUsers() {
    return api.get("user");
  }

  getUser(id) {
    return api.get(`user/${id}`);
  }

  updateUser(id, data) {
    return api.patch(`user/${id}`, data);
  }

  deleteUser(id) {
    return api.delete(`user/${id}`);
  }
}

export default new UserService();
