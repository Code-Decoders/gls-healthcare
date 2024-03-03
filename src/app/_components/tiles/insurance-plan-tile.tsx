import * as React from "react";
import { Insurance, InsurancePlan } from "@/app/_lib/types";
import { Card, CardBody } from "@nextui-org/react";

const InsurancePlanTile: React.FC<
  Insurance & {
    approveInsurance: (id: string) => void;
    rejectInsurance: (id: string) => void;
  }
> = ({
  provider,
  createdAt,
  approveInsurance,
  amount,
  date,
  detail,
  id,
  status,
  claimant,
  patient,
  rejectInsurance,
}) => {
  const imageUrl = "https://picsum.photos/200/300";

  return (
    <Card shadow="sm" className="w-full">
      <CardBody className="flex flex-row items-start gap-5">
        <img
          src={imageUrl}
          alt="Insurance Plan"
          className="rounded-xl max-h-[250px]"
        />
        <div className="flex flex-col gap-1">
          <h4 className="text-xl font-semibold">{claimant}</h4>
          <p className="text-gray-500">{detail}</p>
          <ul className="mt-2">
            <li>
              <span className="font-semibold">Coverage:</span> {amount}
            </li>
            <li>
              <span className="font-semibold">Provider:</span> {provider}
            </li>
            <li>
              <span className="font-semibold">Price:</span> {amount}
            </li>
            <li>
              <span className="font-semibold">Duration:</span> {new Date(date).toDateString()}
            </li>
            <li>
              <span className="font-semibold">Created At:</span>{" "}
              {String(createdAt)}
            </li>
          </ul>
          <div className="w-full flex flex-row">
            <button
            onClick={() => approveInsurance(id!)}
            className="px-4 py-2 bg-button text-black rounded-md ml-auto">
              Approve
            </button>
            <button
            onClick={() => rejectInsurance(id!)}
            className="px-4 py-2 bg-red-400 text-black rounded-md ml-auto">
              Reject
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InsurancePlanTile;
