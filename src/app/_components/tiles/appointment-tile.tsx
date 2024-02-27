import * as React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";

interface AppointmentTileProps {
  onTileClick?(): void;
  patientName: string;
  issue: string;
  from: string;
  to: string;
}

const getRandomImage = () => "https://placekitten.com/200/300";

const AppointmentTile: React.FC<AppointmentTileProps> = ({
  onTileClick,
  patientName,
  issue,
  from,
  to,
}) => {
  const randomImageURL = getRandomImage();

  return (
    <Card className="w-full h-[150px] border rounded-md p-4 my-2 flex items-center flex-row">
      <img
        src={randomImageURL}
        alt="Patient"
        className="w-10 h-10 object-cover rounded-full mr-4 aspect-square"
      />
      <CardBody>
        <h3 className="text-lg font-semibold">{patientName}</h3>
        <p className="text-gray-500">{issue}</p>
        <p className="text-gray-500">
          From: {from} - To: {to}
        </p>
      </CardBody>
      {onTileClick && (
        <Button
          size="sm"
          className="px-4 py-2 rounded text-nowrap bg-button"
          onClick={onTileClick}
        >
          View Details
        </Button>
      )}
    </Card>
  );
};

export default AppointmentTile;
