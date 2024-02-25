import * as React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

interface NavbarButtonProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  icon,
  path,
  title,
  isActive,
}) => {
  return (
    <Link href={path} title={title}>
      <Button
        className={`p-2 rounded-md text-dark ${isActive ? "bg-blue-600" : ""}`}
        variant="light"
        isIconOnly
      >
        {icon}
      </Button>
    </Link>
  );
};

export default NavbarButton;
