"use client";
import * as React from "react";
import { InsurancePlan } from "@/app/_lib/types";
import { Input, Button, Textarea } from "@nextui-org/react";
import { playfairDisplay } from "@/app/_lib/utils";

const CreateInsurance = () => {
  const [plan, setPlan] = React.useState<InsurancePlan>({
    description: "",
    price: 0,
    coverage: 0,
    duration: "",
    plan: "",
    provider: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(plan);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlan((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div
      className="grid place-items-center"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 max-w-[550px] w-full p-5"
      >
        <div className="flex flex-col gap-2 items-center text-start">
          <span
            className={`${playfairDisplay.className} text-5xl sm:text-6xl font-mediu`}
          >
            Create new insurance plan
          </span>
          <span className="text-gray-400 mr-auto">
            Start your journey with secure and trusted healthcare
          </span>
        </div>
        <Input
          name="plan"
          size="lg"
          onChange={onChange}
          placeholder="Enter plan name"
          required
          fullWidth
          label="Plan"
          labelPlacement="outside"
          value={plan.plan}
        />
        <Input
          name="provider"
          size="lg"
          onChange={onChange}
          placeholder="Enter plan provider name"
          required
          fullWidth
          label="Provider"
          labelPlacement="outside"
          value={plan.provider}
        />
        <Textarea
          name="description"
          size="lg"
          onChange={onChange}
          placeholder="Enter plan description"
          required
          fullWidth
          label="Description"
          labelPlacement="outside"
          value={plan.description}
        />
        <Input
          name="price"
          size="lg"
          onChange={onChange}
          placeholder="Enter plan price"
          required
          type="number"
          fullWidth
          label="Price"
          endContent="/month"
          startContent="$"
          labelPlacement="outside"
          value={String(plan.price)}
        />
        <Input
          name="duration"
          size="lg"
          onChange={onChange}
          placeholder="Enter plan duration"
          required
          fullWidth
          label="Duration"
          labelPlacement="outside"
          type="date"
          value={plan.duration}
        />
        <Input
          name="coverage"
          size="lg"
          onChange={onChange}
          placeholder="Enter plan coverage"
          required
          fullWidth
          type="number"
          startContent="$"
          label="Coverage"
          labelPlacement="outside"
          value={String(plan.coverage)}
        />
        <Button type="submit" className="bg-black text-white" size="lg">
          Creat Insurance Plan
        </Button>
      </form>
    </div>
  );
};

export default CreateInsurance;
