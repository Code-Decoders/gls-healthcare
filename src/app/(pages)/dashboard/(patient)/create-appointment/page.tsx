"use client";
import * as React from "react";
import {
  Input,
  Button,
  Textarea,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { playfairDisplay } from "@/app/_lib/utils";
import { AppointmentService } from "@/app/_lib/services/mongoose";
import { Appointment, Doctor } from "@/app/_lib/types";
import AuthService from "@/app/_lib/services/auth-service";
import { useAppProvider } from "@/app/providers";

const Consult = () => {
  const {
    state: { user },
  } = useAppProvider();
  const [form, setForm] = React.useState<Partial<Appointment>>({
    patientName: "",
    issue: "",
    description: "",
    time: undefined,
    date: undefined,
    doctor: "",
  });

  const [doctors, setDoctors] = React.useState<Doctor[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentService = new AppointmentService();
    try {
      appointmentService
        .createAppointment({ ...form, patient: user?.id } as Appointment)
        .then((e) => {
          setForm({
            patient: "",
            patientName: "",
            issue: "",
            description: "",
            time: undefined,
            date: undefined,
            doctor: "",
          });  
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((val) => ({ ...val, [e.target.name]: e.target.value }));

  React.useEffect(() => {
    async function fetchUsers() {
      const authService = new AuthService();

      const user = await authService.getUser<Doctor[]>("type", "doctor");
      if (user) {
        setDoctors(user as Doctor[]);
      }
    }

    fetchUsers();
  }, []);

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
            value={form.date?.toString()}
            labelPlacement="outside"
            fullWidth
          />
          <div className="w-full flex flex-col  gap-4">
            <span className="text-lg font-bold">Select Doctor</span>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" size="lg">
                  {form.doctor
                    ? doctors.filter((val) => val.id === form.doctor)[0]
                        .firstName
                    : "Select Doctor"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {doctors.map((doctor) => (
                  <DropdownItem
                    key={doctor.id}
                    onClick={() =>
                      setForm((val) => ({ ...val, doctor: doctor.id }))
                    }
                  >
                    {doctor.firstName} {doctor.lastName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Input
            name="time"
            placeholder="Select time"
            value={form.time?.toString()}
            onChange={handleChange}
            type="datetime-local"
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
