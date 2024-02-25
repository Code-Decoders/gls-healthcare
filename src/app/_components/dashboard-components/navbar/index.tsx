"use client";
import * as React from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoDocumentTextOutline, IoDocumentText } from "react-icons/io5";
import { MdOutlineHealthAndSafety, MdHealthAndSafety } from "react-icons/md";
import { UserType } from "@/app/_lib/types";
import { usePathname } from "next/navigation";
import NavbarButton from "./navbar-button";

interface DashboardNavbarProps {
  type: UserType;
}

interface ButtonRoute {
  title: string;
  path: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
}

interface ButtonGroupProps {
  routes: ButtonRoute[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ routes }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-7 items-center mr-auto ml-auto h-full w-full mt-10">
      {routes.map((route, index) => (
        <NavbarButton
          isActive={pathname === route.path}
          key={index}
          icon={pathname === route.path ? route.activeIcon : route.icon}
          path={route.path}
          title={route.title}
        />
      ))}
    </div>
  );
};

const DoctorButtonGroup: React.FC = () => {
  const routes = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <GoHome color="gray" size={24} />,
      activeIcon: <GoHomeFill color="white" size={24} />,
    },

    {
      title: "Appointments",
      path: "/appointments",
      icon: <BsPeople color="gray" size={24} />,
      activeIcon: <BsPeopleFill color="white" size={24} />,
    },
  ];

  return <ButtonGroup routes={routes} />;
};

const PatientButtonGroup: React.FC = () => {
  const routes = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <GoHome color="gray" size={"24"} />,
      activeIcon: <GoHomeFill color="white" size={"24"} />,
    },
    {
      title: "Appointments",
      path: "/appointments",
      icon: <BsPeople color="gray" size={24} />,
      activeIcon: <BsPeopleFill color="white" size={24} />,
    },
    {
      title: "Medical Records",
      path: "/medical-records",
      icon: <IoDocumentTextOutline color="gray" size={24} />,
      activeIcon: <IoDocumentText color="white" size={24} />,
    },
    {
      title: "Insurance",
      path: "/insurance",
      icon: <MdOutlineHealthAndSafety color="gray" size={24} />,
      activeIcon: <MdHealthAndSafety color="white" size={24} />,
    },
  ];

  return <ButtonGroup routes={routes} />;
};

const ReceptionistButtonGroup: React.FC = () => {
  const routes = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <GoHome />,
      activeIcon: <GoHomeFill />,
    },
    {
      title: "Appointments",
      path: "/appointments",
      icon: <BsPeople />,
      activeIcon: <BsPeopleFill />,
    },
  ];

  return <ButtonGroup routes={routes} />;
};

const InsuranceButtonGroup: React.FC = () => {
  const routes = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <GoHome />,
      activeIcon: <GoHomeFill />,
    },
    {
      title: "Insurance Claims",
      path: "/claims",
      icon: <IoDocumentTextOutline />,
      activeIcon: <IoDocumentText />,
    },
  ];

  return <ButtonGroup routes={routes} />;
};

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ type }) => {
  const renderButtonGroup = () => {
    switch (type as UserType) {
      case UserType.DOCTOR:
        return <DoctorButtonGroup />;
      case UserType.RECEPTIONIST:
        return <ReceptionistButtonGroup />;
      case UserType.PATIENT:
        return <PatientButtonGroup />;
      case UserType.INSURANCE_COMPANY:
        return <InsuranceButtonGroup />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[70px] bg-black h-full items-center fixed left-0 top-0 flex flex-col gap-5">
      {renderButtonGroup()}
    </div>
  );
};

export default DashboardNavbar;
