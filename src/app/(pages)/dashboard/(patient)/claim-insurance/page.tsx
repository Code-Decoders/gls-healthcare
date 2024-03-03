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
import { InsuranceClaimService } from "@/app/_lib/services/mongoose";
import { useAppProvider } from "@/app/providers";
import Image from "next/image";

const ClaimInsurance: React.FC = () => {
  const {
    state: { user },
  } = useAppProvider();
  const [form, setForm] = React.useState<Partial<Insurance>>({
    amount: 0,
    date: undefined,
    detail: "",
    provider: "",
    claimant: "",
    createdAt: new Date(Date.now()),
  });

  const [providers, setProviders] = React.useState<InsuranceCompany[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const insuranceService = new InsuranceClaimService();
    try {
      insuranceService
        .createInsuranceClaim({ ...form, patient: user?.id } as Insurance)
        .then(() => {
          alert("Claim submitted successfully");
          setForm({});
        });
    } catch (error) {
      console.log(error);
    }
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
      className="w-full flex flex-row justify-center items-center"
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
        <span
          className={`${playfairDisplay.className} md:text-5xl text-3xl mb-16`}
        >
          Claim Insurance
        </span>
        <form
          onSubmit={onSubmit}
          className="max-w-[550px] flex flex-col gap-5 w-full p-5"
        >
          <Input
            name="claimant"
            value={form.claimant}
            onChange={handleChange}
            label="Claimant"
            labelPlacement="outside"
            size="lg"
            placeholder="Enter claimant name"
            required
          />
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
            <span className="text-lg font-medium">Select Provider</span>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" size="lg">
                  {form.provider
                    ? providers.filter((val) => val.id === form.provider)[0]
                        .firstName
                    : "Select Provider"}
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
          <Button size="lg" type="submit" className="bg-button">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ClaimInsurance;
