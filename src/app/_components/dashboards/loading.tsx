import * as React from "react";
import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div
      className="flex justify-center items-center w-full"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <Spinner size="lg" color="success" />
    </div>
  );
};

export default Loading;
