import { User } from "../models/user";
import httpApi from "../utils/axios";
import { LoginParams } from "../models/auth";

class AuthService {
  public constructor(public httpApi: any) {}

  public async login({ email, password }: LoginParams) {
    const response = await httpApi.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  }

  public async register(user: User) {
    const response = await httpApi.post("/auth/register", user);

    return response.data;
  }

  public async refreshToken() {
    const response = await httpApi.post("/auth/refreshToken", {
      refreshToken: "",
    });

    return response.data;
  }

  public async me() {
    const response = await httpApi.get("/auth/logout");

    return response.data;
  }
}

export default new AuthService(httpApi);
