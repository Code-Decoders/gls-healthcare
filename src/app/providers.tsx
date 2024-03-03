"use client";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { AppStateType, AppStateValue, User } from "./_lib/types";
import AuthService from "./_lib/services/auth-service";
import Cookies from "js-cookie";
import { AppointmentService } from "./_lib/services/mongoose";

const AppProvider = React.createContext<AppStateType>({} as AppStateType);

export function useAppProvider(): AppStateType {
  const context = React.useContext(AppProvider);
  if (!context) {
    throw new Error("useAppProvider must be used within a AppProvider");
  }

  return context;
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<AppStateValue>({} as AppStateValue);
  const authService: AuthService = new AuthService();
  const appointmentService: AppointmentService = new AppointmentService();

  React.useEffect(() => {
    const fetchUser = async () => {
      const auth = JSON.parse(Cookies.get("auth") || "{}") as User;
      const user = await authService.getUser<User[]>("email", auth.email);
      const appointments = await appointmentService.getAppointmentByField(
        "patient",
        user![0]?.id as string
      );
      setState({ user: user![0], appointments });
    };

    fetchUser();
  }, []);

  return (
    <NextUIProvider>
      <AppProvider.Provider value={{ state, setState }}>
        {children}
      </AppProvider.Provider>
    </NextUIProvider>
  );
};

export default Providers;
