"use client";
import * as React from "react";
import { Avatar, Card } from "@nextui-org/react";
import { Input, Kbd } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

const Header = () => {
  const [search, setSearch] = React.useState("");

  return (
    <Card
      shadow="sm"
      className="w-full h-[70px] bg-white flex items-center flex-row px-10 rounded-none  justify-between"
    >
      <Input
        placeholder="Search"
        className="w-[40%] min-w-[200px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        endContent={<Kbd keys={["ctrl"]}>K</Kbd>}
        startContent={<CiSearch size={24} color="gray" />}
      />
      <Link href={"/dashboard/profile"}>
        <Avatar className="cursor-pointer" />
      </Link>
    </Card>
  );
};

export default Header;
