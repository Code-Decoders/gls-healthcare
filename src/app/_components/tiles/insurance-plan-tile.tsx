import * as React from "react";
import { InsurancePlan } from "@/app/_lib/types";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const InsurancePlanTile: React.FC<InsurancePlan> = ({
  coverage,
  provider,
  plan,
  price,
  planId,
  duration,
  createdAt,
  description,
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
          <h4 className="text-xl font-semibold">{plan}</h4>
          <p className="text-gray-500">{description}</p>
          <ul className="mt-2">
            <li>
              <span className="font-semibold">Coverage:</span> {coverage}
            </li>
            <li>
              <span className="font-semibold">Provider:</span> {provider}
            </li>
            <li>
              <span className="font-semibold">Price:</span> {price}
            </li>
            <li>
              <span className="font-semibold">Duration:</span> {duration}
            </li>
            <li>
              <span className="font-semibold">Created At:</span>{" "}
              {String(createdAt)}
            </li>
          </ul>
          <button className="px-4 py-2 bg-button text-black rounded-md ml-auto">
            Apply
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default InsurancePlanTile;
