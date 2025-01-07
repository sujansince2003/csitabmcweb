"use client";

import React from "react";
import dynamic from "next/dynamic";
import Certificate from "@/components/certificate/Certificate";
import { Button } from "@/components/ui/button";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";

export interface CertificateData {
  participantName: string;
}

interface DownloadCertificateProps {
  certificateData: CertificateData;
}

const DownloadCertificate: React.FC<DownloadCertificateProps> = ({
  certificateData,
}) => {
  return (
    <div>
      <div>
        {/* <PDFViewer width="100%" height="500px">
          <Certificate data={certificateData as any} />
        </PDFViewer> */}
      </div>
      <BlobProvider document={<Certificate data={certificateData as any} />}>
        {({ loading, url }) => (
          <Button
            disabled={loading}
            onClick={() => {
              if (url) {
                const link = document.createElement("a");
                link.href = url;
                link.download = `${certificateData.participantName}.pdf`;
                link.click();
              }
            }}
          >
            {loading ? "Validating Certificate" : "Download Certificate"}
          </Button>
        )}
      </BlobProvider>
    </div>
  );
};

export default DownloadCertificate;
