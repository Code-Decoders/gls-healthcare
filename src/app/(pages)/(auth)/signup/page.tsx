"use client";
import * as React from "react";
import { UserType, User } from "@/app/_lib/types";
import Image from "next/image";
import { playfairDisplay } from "@/app/_lib/utils";
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
import AuthService from "@/app/_lib/services/auth-service";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [authState, setAuthState] = React.useState<
    Partial<User & { confirmPassword: string }>
  >({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    contactNumber: "",
    type: UserType.PATIENT,
  });

  const [authStateError, setAuthStateError] = React.useState<
    Partial<User & { confirmPassword: string }>
  >({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    contactNumber: "",
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...payload } = authState;

    const authService = new AuthService();
    const { error, data } = await authService.signup(payload as User);
    if (!error) {
      location.reload();
      router.push("/dashboard");
    } else {
      console.log(error);
    }
  };

  const validateForm = () => {
    const errors: Partial<User & { confirmPassword: string }> = {};
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    );

    if (!authState.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(authState.email)) {
      errors.email = "Email is invalid";
    }

    if (!authState.password) {
      errors.password = "Password is required";
    } else if (authState.password !== authState.confirmPassword) {
      errors.password = "Passwords do not match";
    } else if (authState.password.length < 8) {
      errors.password = "Password must be at least 6 characters";
    } else if (!passwordRegex.test(authState.password)) {
      errors.password =
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
    }

    if (!authState.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!authState.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!authState.city) {
      errors.city = "City is required";
    }

    if (!authState.address) {
      errors.address = "Address is required";
    }

    if (!authState.contactNumber) {
      errors.contactNumber = "Contact Number is required";
    } else if (authState.contactNumber.length < 10) {
      errors.contactNumber = "Contact Number is invalid";
    } else if (!/^\+?\d{10,}$/.test(authState.contactNumber || "")) {
      errors.contactNumber = "Invalid contact number";
    }

    setAuthStateError(errors);

    return Object.keys(errors).length === 0;
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
      <div className="flex flex-col flex-1 items-center p-10 max-h-full overflow-y-auto">
        <span className="text-xl font-bold">GLS Healthcare</span>
        <section title="Login" className="mt-auto flex-col flex gap-16 mb-auto">
          <div className="flex flex-col gap-2 items-center">
            <span
              className={`${playfairDisplay.className} text-5xl sm:text-6xl font-medium`}
            >
              Register
            </span>
            <span className="text-gray-400">
              Start your journey with secure and trusted healthcare
            </span>
          </div>
          <form onSubmit={onSubmit} className="flex-col flex gap-10">
            <div className="flex gap-2">
              <Input
                value={authState.firstName}
                name="firstName"
                errorMessage={authStateError.firstName}
                onChange={handleInputChange}
                label="First Name"
                required
                labelPlacement="outside"
                size="lg"
                placeholder="Enter your first name"
              />
              <Input
                value={authState.lastName}
                name="lastName"
                errorMessage={authStateError.lastName}
                onChange={handleInputChange}
                required
                label="Last Name"
                labelPlacement="outside"
                size="lg"
                placeholder="Enter your last name"
              />
            </div>
            <Input
              autoComplete="email"
              value={authState.email}
              name="email"
              errorMessage={authStateError.email}
              onChange={handleInputChange}
              label="Email"
              labelPlacement="outside"
              required
              size="lg"
              placeholder="Enter your email"
            />
            <Input
              value={authState.city}
              name="city"
              onChange={handleInputChange}
              errorMessage={authStateError.city}
              label="City"
              labelPlacement="outside"
              size="lg"
              placeholder="Enter your city"
              required
            />
            <Input
              value={authState.address}
              name="address"
              onChange={handleInputChange}
              label="Address"
              labelPlacement="outside"
              type="text"
              size="lg"
              placeholder="Enter your address"
            />
            <Input
              value={authState.contactNumber}
              name="contactNumber"
              errorMessage={authStateError.contactNumber}
              onChange={handleInputChange}
              label="Contact Number"
              required
              labelPlacement="outside"
              type="tel"
              size="lg"
              placeholder="Enter your contact number"
            />
            <Input
              value={authState.password}
              name="password"
              errorMessage={authStateError.password}
              onChange={handleInputChange}
              label="Password"
              labelPlacement="outside"
              size="lg"
              required
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
              required
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
            <div className="flex flex-col gap-2">
              <span className="text-medium">Select your account type</span>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="faded">
                    {authState.type && userTypeMapping[authState.type]}
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
            </div>
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
