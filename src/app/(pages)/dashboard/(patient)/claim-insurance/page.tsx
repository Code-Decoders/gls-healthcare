"use client";
import * as React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Insurance, InsuranceCompany } from "@/app/_lib/types/user-type";
import { playfairDisplay } from "@/app/_lib/utils";
import AuthService from "@/app/_lib/services/auth-service";

//Make a Claim insurance page with basic UI and state with form validation use Insurance type
const ClaimInsurance: React.FC = () => {
  const [form, setForm] = React.useState<Partial<Insurance>>({
    amount: 0,
    date: undefined,
    detail: "",
    provider: "",
  });

  const [providers, setProviders] = React.useState<InsuranceCompany[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((val) => ({ ...val, [e.target.name]: e.target.value }));

  React.useEffect(() => {
    const authService = new AuthService();

    const fetchProviders = async () => {
      const response = await authService.getUser<InsuranceCompany[]>(
        "type",
        "insurance_company"
      );
      setProviders(response || []);
    };

    fetchProviders();
  }, []);

  return (
    <div
      className="w-full flex flex-col justify-center items-center"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <span
        className={`${playfairDisplay.className} md:text-5xl text-3xl mb-16`}
      >
        Claim Insurance
      </span>
      <form
        onSubmit={onSubmit}
        className="max-w-[550px] flex flex-col gap-5 w-full p-5"
      >
        <Textarea
          name="detail"
          value={form.detail}
          onChange={handleChange}
          label="Detail"
          labelPlacement="outside"
          size="lg"
          placeholder="Enter claim details"
          required
        />
        <Input
          name="amount"
          value={form.amount?.toString()}
          onChange={handleChange}
          label="Amount"
          labelPlacement="outside"
          size="lg"
          type="number"
          placeholder="Enter amout to claim"
          required
        />
        <div className="w-full flex flex-col  gap-4">
          <span className="text-lg font-bold">Select Doctor</span>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" size="lg">
                {form.provider
                  ? providers.filter((val) => val.id === form.provider)[0]
                      .firstName
                  : "Select Doctor"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {providers.map((prov) => (
                <DropdownItem
                  key={prov.id}
                  onClick={() =>
                    setForm((val) => ({ ...val, provider: prov.id }))
                  }
                >
                  {prov.firstName} {prov.lastName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Input
          name="date"
          value={form.date?.toString()}
          onChange={handleChange}
          labelPlacement="outside"
          placeholder="k"
          label={"Date"}
          type="date"
          size="lg"
          required
        />
        <Button size="lg" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ClaimInsurance;
