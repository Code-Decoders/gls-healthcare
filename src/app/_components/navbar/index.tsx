"use client";
import * as React from "react";
import NavbarButton from "./navbar-button";
import { usePathname } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useViewport } from "@/app/_lib/utils";
import { CiMenuFries } from "react-icons/ci";

interface NavBarButtonGroupProps {
  hoverIndex: number | undefined;
  children: React.ReactNode;
  pathname: string;
}

const NavBarButtonGroup: React.FC<NavBarButtonGroupProps> = ({
  children,
  hoverIndex,
  pathname,
}) => {
  const path = pathname;
  const positionStyles: React.CSSProperties = {};
  const blockStyles: React.CSSProperties = {};

  if (hoverIndex === 1) {
    positionStyles.transform = "translateX(-180%)";
  } else if (hoverIndex === 2) {
    positionStyles.transform = "translateX(-60%)";
  } else if (hoverIndex === 3) {
    positionStyles.transform = "translateX(60%)";
  } else if (hoverIndex === 4) {
    positionStyles.transform = "translateX(170%)";
  }

  if (path === "/" || path === "/#") {
    blockStyles.transform = "translateX(-150%)";
  } else if (path === "/consult") {
    blockStyles.transform = "translateX(-50%)";
  } else if (path === "/insurance") {
    blockStyles.transform = "translateX(50%)";
  } else if (path === "/about") {
    blockStyles.transform = "translateX(150%)";
  }

  return (
    <div className="justify-center items-center relative hidden mr-auto ml-auto md:flex">
      <div
        className={`w-24 bg-gray-500/10 bg-dark/10 h-12 rounded-md absolute z-[-1] transition-[opacity, transform] ease-in-out duration-300 ${
          hoverIndex ? "opacity-100" : "opacity-0"
        }`}
        style={positionStyles}
      />
      <div
        className={` z-[-1] p-2 rounded-md absolute  bg-button text-dark dark:text-light w-28 h-12 flex items-center justify-center ease-out duration-200 nav-button transition-[colors, transform]`}
        style={blockStyles}
      />
      {children}
    </div>
  );
};

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = React.useState<number | undefined>(0);
  const { height, width } = useViewport();

  const onNavHover = (index: number | undefined) => {
    setHoverIndex(index);
  };

  return (
    <div
      className="w-screen h-[70px] flex items-center md:justify-between justify-end text-black fixed top-0 px-5 z-10"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <NavBarButtonGroup hoverIndex={hoverIndex} pathname={pathname}>
        <NavbarButton
          title="Home"
          path="/"
          currentPath={pathname}
          onHoverIndex={onNavHover}
          index={1}
        />
        <NavbarButton
          title="Consult"
          path="/consult"
          currentPath={pathname}
          onHoverIndex={onNavHover}
          index={2}
        />
        <NavbarButton
          title="Insurance"
          path="/insurance"
          currentPath={pathname}
          onHoverIndex={onNavHover}
          index={3}
        />
        <NavbarButton
          title="About"
          path="/about"
          currentPath={pathname}
          onHoverIndex={onNavHover}
          index={4}
        />
      </NavBarButtonGroup>
      <Dropdown backdrop="blur" size={"lg"}>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="border-button rounded-md"
            size={"lg"}
            isIconOnly={width < 768}
          >
            {width > 768 ? "Login" : <CiMenuFries size={24} />}
          </Button>
        </DropdownTrigger>
        {width > 768 ? (
          <DropdownMenu variant="bordered">
            <DropdownItem key="patient" href={`/login?type=patient`}>
              Patient
            </DropdownItem>
            <DropdownItem key="doctor" href={`/login?type=doctor`}>
              Doctor
            </DropdownItem>
            <DropdownItem key="receptionist" href={`/login?type=receptionist`}>
              Receptionist
            </DropdownItem>
            <DropdownItem key="insurance" href={`/login?type=insurance`}>
              Insurance Admin
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu variant="bordered">
            <DropdownItem key="patient" href={`/`}>
              Home
            </DropdownItem>
            <DropdownItem key="doctor" href={`/consult`}>
              Consult
            </DropdownItem>
            <DropdownItem key="receptionist" href={`/insurance`}>
              Insurance
            </DropdownItem>
            <DropdownItem key="insurance" href={`/about`}>
              About
            </DropdownItem>
            <DropdownItem key={"login"} href="/login" color="success">
              Login
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
};

export default NavBar;
