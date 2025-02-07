"use client";
import React from "react";
import Certificate from "@/components/certificate/Certificate";
import { Button } from "@/components/ui/button";
import { BlobProvider } from "@react-pdf/renderer";
import { CertificateTypes } from "@/types/certificate";

interface DownloadCertificateProps {
  certificateData: CertificateTypes;
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
                link.download = `${certificateData.fullName}.pdf`;
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
