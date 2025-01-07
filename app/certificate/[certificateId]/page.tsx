"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Certificate from "@/components/certificate/Certificate";
import { PDFViewer } from "@react-pdf/renderer";
// const PDFViewer = dynamic(
//   () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
//   {
//     ssr: false,
//     loading: () => <p>Loading PDF Viewer...</p>,
//   }
// );

// const PDFDownloadLink = dynamic(
//   () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
//   {
//     ssr: false,
//     loading: () => <p>Loading Download Link...</p>,
//   }
// );

// const Certificate = dynamic(
//   () => import("@/components/certificate/Certificate"),
//   {
//     ssr: false,
//     loading: () => <p>Loading Certificate...</p>,
//   }
// );

interface CertificateData {
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

export default function CertificateGenerator() {
  const { certificateId } = useParams();
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificate/${certificateId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch certificate");
        }
        const data = await response.json();
        setCertificateData(data);
      } catch (err) {
        setError("Error fetching certificate data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!certificateData) return <p>No certificate found</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="grid place-items-center">
          <PDFViewer width="100%" height="600px">
            <Certificate data={certificateData} />
          </PDFViewer>
          <div>
            {/* <PDFDownloadLink
              document={<Certificate data={certificateData} />}
              fileName={`certificate-${certificateData.uniqueId}.pdf`}
            >
              {({ loading }: { loading: boolean }) => (
                <Button disabled={loading}>
                  {loading ? "Generating PDF..." : "Download Certificate"}
                </Button>
              )}
            </PDFDownloadLink> */}
          </div>
        </div>
      </div>
    </div>
  );
}
