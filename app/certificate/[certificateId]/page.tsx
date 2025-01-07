import React from "react";
import DownloadCertificate from "./DownloadCertificate";
import { Card, CardContent } from "@/components/ui/card";
export interface CertificateData {
  uniqueId: string;
  participantName: string;
  event: {
    title: string;
    startDate: string;
    endDate: string;
  };
  user: {
    name: string;
    department: string;
  };
  issuedAt: string;
}

const CertificateData = async ({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) => {
  const { certificateId } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificate/${certificateId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch certificate");
    }
    const data = await response.json();
  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="mt-4 max-w-[30rem] p-[5rem] rounded-md m-auto text-center border text-gray-400">
            Your browser cannot render the certificate. You can download it using the button below the card.
          </div>
          <div className="text-xl mt-2 text-center">{data.participantName}</div>
        </CardContent>
      </Card>
      <div className="flex justify-center mb-4">
      <DownloadCertificate certificateData={data} />
      </div>
    </div>
  )
} catch (error) {
 return (
    <div>
      <h1>Certificate Not Found</h1>
      <div>the certificate id : {certificateId}</div>
    </div>
 ) 
}
}

export default CertificateData;
