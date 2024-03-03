"use client";
import * as React from "react";
import Image from "next/image";
import { playfairDisplay } from "@/app/_lib/utils";
import { Button, Input } from "@nextui-org/react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import AuthService from "@/app/_lib/services/auth-service";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [authState, setAuthState] = React.useState({
    email: "",
    password: "",
  });

  const [authError, setAuthError] = React.useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAuthState({ ...authState, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const authService = new AuthService();
    authService
      .login(authState.email, authState.password)
      .then((res) => {
        location.reload();
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateForm = () => {
    let errors = { email: "", password: "" };
    let isValid = true;

    if (!authState.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!authState.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    setAuthError(errors);
    return isValid;
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 h-full relative overflow-hidden rounded-md p-2 md:flex hidden">
        <Image
          src="/images/login-wall.jpg"
          alt="Login"
          className="object-cover w-full h-full rounded-[30px]"
          width={1500}
          height={1500}
        />
      </div>
      <div className="flex flex-col flex-1 items-center p-10">
        <span className="text-xl font-bold">GLS Healthcare</span>
        <section title="Login" className="mt-auto flex-col flex gap-16 mb-auto">
          <div className="flex flex-col gap-2 items-center">
            <span
              className={`${playfairDisplay.className} text-5xl sm:text-6xl font-medium`}
            >
              Welcome Back
            </span>
            <span className="text-gray-400">
              Enter your credentials to continue
            </span>
          </div>
          <form onSubmit={onSubmit} className="flex-col flex gap-10">
            <Input
              value={authState.email}
              name="email"
              onChange={handleInputChange}
              label="Email"
              errorMessage={authError.email}
              labelPlacement="outside"
              size="lg"
              placeholder="Enter your email"
            />
            <Input
              value={authState.password}
              name="password"
              onChange={handleInputChange}
              label="Password"
              labelPlacement="outside"
              size="lg"
              placeholder="Enter your password"
              errorMessage={authError.password}
              type={showPass ? "text" : "password"}
              endContent={
                showPass ? (
                  <IoMdEyeOff
                    className="cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                    size={20}
                  />
                ) : (
                  <IoEye
                    className="cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                    size={20}
                  />
                )
              }
            />
            <div className="flex flex-row justify-between">
              <fieldset className="flex gap-2 text-sm font-bold text-gray-500">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  id="remember"
                />
                <label htmlFor="remember">Remember me</label>
              </fieldset>
              <Link
                className="text-sm font-bold text-gray-500"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              variant="solid"
              className="bg-black text-white font-bold"
              size={"lg"}
            >
              Sign in
            </Button>
          </form>
        </section>
        <span>
          Don&apos;t have an account?&nbsp;
          <Link href="/signup" className="font-bold">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
