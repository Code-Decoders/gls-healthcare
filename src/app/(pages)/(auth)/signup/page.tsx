"use client";
import * as React from "react";
import { UserType } from "@/app/lib/types";
import Image from "next/image";
import { playfairDisplay } from "@/app/lib/utils";
import {
  Button,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";

const Signup = () => {
  const [authState, setAuthState] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    type: UserType.PATIENT,
  });

  const userTypeMapping = {
    [UserType.PATIENT]: "Patient",
    [UserType.DOCTOR]: "Doctor",
    [UserType.RECEPTIONIST]: "Receptionist",
    [UserType.INSURANCE_COMPANY]: "Insurance Company",
  };

  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAuthState({ ...authState, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(authState);
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
              className={`${playfairDisplay.className} text-4xl sm:text-6xl font-medium`}
            >
              Register
            </span>
            <span className="text-gray-400">
              Start your journey with secure and trusted healthcare
            </span>
          </div>
          <form onSubmit={onSubmit} className="flex-col flex gap-10">
            <Input
              autoComplete="email"
              value={authState.email}
              name="email"
              onChange={handleInputChange}
              label="Email"
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
            <Input
              value={authState.confirmPassword}
              name="confirmPassword"
              onChange={handleInputChange}
              label="Confirm Password"
              labelPlacement="outside"
              size="lg"
              placeholder="Re-enter your password"
              type={showConfirmPass ? "text" : "password"}
              endContent={
                showConfirmPass ? (
                  <IoMdEyeOff
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    size={20}
                  />
                ) : (
                  <IoEye
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    size={20}
                  />
                )
              }
            />
            <Dropdown>
              <DropdownTrigger>
                <Button variant="faded">
                  {userTypeMapping[authState.type]}
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded">
                {Object.values(UserType).map((type) => (
                  <DropdownItem
                    key={type}
                    onClick={() =>
                      setAuthState({ ...authState, type: type as UserType })
                    }
                  >
                    {userTypeMapping[type as UserType]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
              Create account
            </Button>
          </form>
        </section>
        <span>
          Already have an account?&nbsp;
          <Link href="/login" className="font-bold">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
