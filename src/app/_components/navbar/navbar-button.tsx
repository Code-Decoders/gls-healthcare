import * as React from "react";
import Link from "next/link";

interface NavbarButtonProps {
  title: string;
  path: string;
  currentPath: string;
  onHoverIndex(index: number | undefined): void;
  index: number;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  title,
  path,
  onHoverIndex,
  index,
}) => {
  return (
    <Link href={path} passHref>
      <div
        className={`p-2 rounded-md text-dark dark:text-light w-28 h-12 flex items-center justify-center text-lg transition-colors ease-out duration-200 nav-button `}
        onMouseEnter={() => onHoverIndex(index)}
        onMouseLeave={() => onHoverIndex(undefined)}
      >
        {title}
      </div>
    </Link>
  );
};

export default NavbarButton;
