import { User } from "../types";
import Cookies from "js-cookie";

interface IAuthService {
  login(email: string, password: string): Promise<any>;
  signup(payload: User): Promise<any>;
  logout(): Promise<any>;
  getUser<T>(field: string, value: string): Promise<T | undefined>;
}

class AuthService implements IAuthService{

  

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const user = data.user;
          if (data.error) {
            reject({ error: data.error, data: null });
          }
          const authCookieObject = {
            id: user.id,
            type: user.type,
            email: user.email,
          };
          const authCookie = JSON.stringify(authCookieObject);
          Cookies.set("auth", authCookie, {
            expires: 7,
          });
          Cookies.set("isLoggedIn", "true", {
            expires: 7,
          });
          resolve({ data, error: null });
        })
        .catch((error) => {
          reject({ error: error.message, data: null });
        });
    });
  }

  signup(payload: User): Promise<{ data: any; error: any }> {
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

        const user = data.user;
        if (data.error) {
          reject({ error: data.error, data: null });
        }
        const authCookieObject = {
          id: user.id,
          type: user.type,
          email: user.email,
        };
        const authCookie = JSON.stringify(authCookieObject);
        Cookies.set("auth", authCookie, {
          expires: 7,
        });
        Cookies.set("isLoggedIn", "true", {
          expires: 7,
        });
        resolve({ data, error: null });
      } catch (error: any) {
        reject({ error: error.message, data: null });
      }
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      try {
        Cookies.remove("auth");
        Cookies.remove("isLoggedIn");
        resolve({ data: "Success", error: null });
      } catch (error: any) {
        reject({ error: error.message, data: null });
      }
    });
  }

  getUser<T>(field: string,  value: string): Promise<T | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "/api/auth?" +
            new URLSearchParams({
              field: field,
              value: value,
            }).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        resolve(data.user);
      } catch (error: any) {
        reject({ error: error.message, data: null });
      }
    });
  }
}

export default AuthService;
