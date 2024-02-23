'use client'
import React from 'react';
import { Button, Card, Divider } from '@nextui-org/react'; 
import Image from 'next/image'; 
import { useRouter } from 'next/navigation'

const DoctorProfilePage: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center"
        style={{
            height: "calc(100vh - 70px)",
        }}
        >
            <Card className="w-96 p-6">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="https://www.contensis.com/image-library/resources-images/image-api-examples/tree-frog.jpg?width=500"
                        alt="Doctor Profile Picture"
                        className="w-32 h-32 rounded-full"
                    />
                    <h1 className="text-2xl font-bold">Dr. John Doe</h1>
                    <p className="text-gray-500">Specialty: Cardiology</p>
                    <Divider className="w-full" />
                    <div className="flex flex-col space-y-2">
                        <p className="text-gray-500">Email: johndoe@example.com</p>
                        <p className="text-gray-500">Phone: +1 123-456-7890</p>
                        <p className="text-gray-500">Address: 123 Main St, City, Country</p>
                    </div>
                    <Divider className="w-full" />
                    <div className="flex justify-end w-full ">
                        <Button variant="flat">Logout</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DoctorProfilePage;