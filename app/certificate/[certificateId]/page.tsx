import React from "react";
import DownloadCertificate from "./DownloadCertificate";
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
      <h1>Certificate Verified</h1>
      <div>the certificate id : {certificateId}</div>
      <DownloadCertificate certificateData={data} />
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
