"use client";
import * as React from "react";
import Image from "next/image";
import { InsurancePlan } from "@/app/_lib/types";
import { playfairDisplay } from "@/app/_lib/utils";
import { InsurancePlanTile } from "@/app/_components/tiles";

const Insurance = () => {
  const [insurancePlan, setInsurancePlan] = React.useState<InsurancePlan[]>([
    {
      provider: "ABC Insurance",
      plan: "Basic Health Insurance",
      coverage: 80,
      planId: "plan001",
      duration: "1 year",
      price: 500,
      description:
        "Provides basic health coverage with an 80% reimbursement rate. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: new Date("2023-01-01"),
    },
    {
      provider: "XYZ Insurance",
      plan: "Comprehensive Auto Insurance",
      coverage: 95,
      planId: "plan002",
      duration: "6 months",
      price: 800,
      description:
        "Comprehensive coverage for auto-related incidents with a 95% reimbursement rate. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: new Date("2023-02-15"),
    },
    {
      provider: "DEF Insurance",
      plan: "Homeowners Insurance",
      coverage: 90,
      planId: "plan003",
      duration: "1 year",
      price: 1200,
      description:
        "Insurance coverage for homeowners, providing protection for property and belongings. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: new Date("2023-03-10"),
    },
  ]);

  return (
    <div
      className="w-full flex flex-row items-center"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <div className="w-1/2 h-full relative overflow-hidden rounded-md p-2 md:flex hidden">
        <Image
          src="/images/insurance.jpg"
          alt="Login"
          className="object-cover w-full h-full rounded-[30px]"
          width={1200}
          height={1200}
        />
      </div>
      <div className="max-w-[50%] overflow-y-auto max-h-[100%] p-10 gap-5 flex flex-col">
        {insurancePlan.map((plan) => (
          <InsurancePlanTile {...plan} key={plan.planId} />
        ))}
      </div>
    </div>
  );
};

export default Insurance;
