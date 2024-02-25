"use client";
import * as React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { playfairDisplay } from "@/app/_lib/utils";

const Consult = () => {
  const [form, setForm] = React.useState({
    patientName: "",
    age: "",
    issue: "",
    description: "",
    preferredTime: "",
    date: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((val) => ({ ...val, [e.target.name]: e.target.value }));
  return (
    <div
      className="w-full flex flex-row items-center"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <div className="w-1/2 h-full relative overflow-hidden rounded-md p-2 md:flex hidden">
        <Image
          src="/images/consult.jpg"
          alt="Login"
          className="object-cover w-full h-full rounded-[30px]"
          width={1200}
          height={1200}
        />
      </div>
      <div className="grid place-items-center gap-10 flex-1">
        <form
          onSubmit={onSubmit}
          className="max-w-[500px] flex-col flex gap-5 w-full p-5"
        >
          <div className="flex flex-col gap-2 items-center">
            <span
              className={`${playfairDisplay.className} text-5xl sm:text-6xl font-medium pb-5`}
            >
              Book your appointment today
            </span>
          </div>
          <Input
            name="patientName"
            label="Patient name"
            placeholder="Enter patient name"
            onChange={handleChange}
            labelPlacement="outside"
            value={form.patientName}
            fullWidth
          />
          <Input
            name="age"
            label={"Age"}
            placeholder={"Enter patient age"}
            onChange={handleChange}
            labelPlacement="outside"
            value={form.age}
            fullWidth
          />
          <Input
            name="issue"
            label="Issue"
            placeholder="What's your issue?"
            onChange={handleChange}
            form={form.issue}
            labelPlacement="outside"
            fullWidth
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="More about your issue"
            labelPlacement="outside"
            onChange={handleChange}
            value={form.description}
            fullWidth
          />
          <Input
            name="date"
            placeholder="Select date"
            onChange={handleChange}
            label={"Date"}
            type="date"
            value={form.date}
            labelPlacement="outside"
            fullWidth
          />
          <Input
            name="preferredTime"
            placeholder="Select time"
            value={form.preferredTime}
            onChange={handleChange}
            type="time"
            label={"Preferred time"}
            fullWidth
            labelPlacement="outside"
          />
          <Button
            className="bg-black text-white font-bold"
            size="lg"
            type="submit"
          >
            Book Appointment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Consult;
