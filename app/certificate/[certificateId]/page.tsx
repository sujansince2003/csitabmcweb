import React from "react";
import DownloadCertificate from "./DownloadCertificate";
import { Card, CardContent } from "@/components/ui/card";

import { metadata } from "@/app/layout";

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/${certificateId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch certificate");
    }
    const data = await response.json();
    metadata.title = data.participantName + " | Certified";
    metadata.description = "CSIT Assocaiotn of BMC Certificate Verification";
    metadata.openGraph = metadata.openGraph ?? {};
    metadata.openGraph.images = {
      url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png",
      width: 1200,
      height: 600,
    };
    return (
      <div>
        <Card>
          <CardContent className="pt-6">
            <div className="mt-4 max-w-[30rem] p-[5rem] rounded-md m-auto text-center border text-gray-400">
              Your browser cannot render the certificate. You can download it
              using the button below the card.
            </div>
            <div className="text-xl mt-2 text-center">
              {data.participantName}
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center mb-4">
          <DownloadCertificate certificateData={data} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Certificate Not Found</h1>
        <div>the certificate id : {certificateId}</div>
      </div>
    );
  }
};

export default CertificateData;
