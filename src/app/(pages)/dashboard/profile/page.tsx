"use client";
import * as React from "react";
import { Button, Card, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AuthService from "@/app/_lib/services/auth-service";
import { useAppProvider } from "@/app/providers";

const DoctorProfilePage: React.FC = () => {

  const authService = new AuthService();
  const router = useRouter()

  const { state } = useAppProvider();

  const logout = () => {
    authService
      .logout()
      .then((res) => {
        console.log(res);
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <Card className="w-96 p-6">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://www.contensis.com/image-library/resources-images/image-api-examples/tree-frog.jpg?width=500"
            alt="Doctor Profile Picture"
            className="w-32 h-32 rounded-full"
          />
          <h1 className="text-2xl font-bold">Dr. {state.user?.firstName}</h1>
          <Divider className="w-full" />
          <div className="flex flex-col space-y-2">
            <p className="text-gray-500">Email: {state.user?.email}</p>
            <p className="text-gray-500">Phone: +91&nbsp;{state.user?.contactNumber}</p>
            <p className="text-gray-500">Address: {state.user?.address}</p>
          </div>
          <Divider className="w-full" />
          <div className="flex justify-end w-full ">
            <Button variant="flat" onClick={() => logout()}>Logout</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorProfilePage;

