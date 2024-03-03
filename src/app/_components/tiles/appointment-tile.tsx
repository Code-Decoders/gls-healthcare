import * as React from "react";
import { Card, CardBody, Button, Image } from "@nextui-org/react";

interface AppointmentTileProps {
  patientName: string;
  issue: string;
  from: string;
  id: string;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onFinish?: (id: string) => void;
  status: "pending" | "approved" | "rejected" | "finish";
  type?: "doctor" | "receptionist";
}

const getRandomImage = () => "https://placekitten.com/200/300";

const AppointmentTile: React.FC<AppointmentTileProps> = ({
  patientName,
  issue,
  from,
  type = "doctor",
  id,
  status,
  onFinish,
  onApprove,
  onReject,
}) => {
  const randomImageURL = getRandomImage();

  //Limit the issue to at max 3 lines and after that ellipsis

  return (
    <Card className="w-full h-[150px] border rounded-md p-4 my-2 flex items-center flex-row">
      <Image
        src={randomImageURL}
        alt="Patient"
        className="w-10 h-10 object-cover rounded-full mr-4 aspect-square"
      />
      <CardBody>
        <h3 className="text-lg font-semibold">{patientName}</h3>
        <p className="text-gray-500">{issue}</p>
        <p className="text-gray-500">From: {from}</p>
      </CardBody>
      {type === "doctor" ? (
        <Button
          onClick={() => onFinish!(id)}
          size="sm"
          className="px-4 py-2 rounded text-nowrap bg-button"
        >
          Finish
        </Button>
      ) : type === "receptionist" ? (
        status !== "approved" ? (
          <div className="w-full flex flex-row justify-between items-center">
            <Button
              onClick={() => onApprove!(id)}
              size="sm"
              className="px-4 py-2 rounded text-nowrap bg-button"
            >
              Approve
            </Button>
            <Button
              onClick={() => onReject!(id)}
              size="sm"
              className="px-4 py-2 rounded text-nowrap bg-button"
            >
              Reject
            </Button>
          </div>
        ) : (
          <Button size="sm" className="px-4 py-2 rounded text-nowrap bg-button">
            Approved
          </Button>
        )
      ) : undefined}
    </Card>
  );
};

export default AppointmentTile;
