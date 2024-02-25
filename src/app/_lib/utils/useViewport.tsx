"use client";
import * as React from "react";
import { Size } from "../types";

const useViewport = (): Size => {
  const [size, setSize] = React.useState<Size>({
    height: 0,
    width: 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setSize({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useViewport;
