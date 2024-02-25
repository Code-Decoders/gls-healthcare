import { User } from "../types";
import Cookies from "js-cookie";

interface IAuthService {
  login(email: string, password: string): Promise<any>;
  signup(payload: User): Promise<any>;
  logout(): Promise<any>;
}

class AuthService {
  login(
    email: string,
    password: string,
    type: "doctor" | "receptionist" | "patient" | "insurance_company"
  ) {
    return new Promise((resolve, reject) => {});
  }

  signup(payload: User) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        console.log(data)
        const user = data.user;
        const authCookieObject = {
            id: user.id,
            email: user.email,
            type: user.type,
        };
        const authCookie = JSON.stringify(authCookieObject);
        Cookies.set("auth", authCookie);
        Cookies.set("isLoggedIn", "true")
        resolve(data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  logout() {
    return new Promise((resolve, reject) => {});
  }
}

export default AuthService