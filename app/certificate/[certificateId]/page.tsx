"use client";
import Certificate from "@/components/certificate/Certificate";
import { styles } from "@/components/certificate/style";
import { Button } from "@/components/ui/button";
import { PDFRenderer, PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const data = {
  ID:"ASDFD-D789ASDF-897SADF",
  name: "Bipin Khatri",
  course: "Fundamentals of Web Development",

}

export default function CertificateGenerator() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="grid place-items-center">
          <PDFViewer width="100%" height="600px">
            <Certificate data={"httdfpsnvadfdfdfddfdesign/DAGbWGRrR1E/5r8iFj0WJY-AnZ_fpR9DbQ/edit"} />
          </PDFViewer>
          <div>
            <PDFDownloadLink
              document={<Certificate data={data.ID+data.name+data.course} />}
              fileName="certificate.pdf"
            >
              {({ loading }: { loading: boolean }) => (
                <Button disabled={loading}>
                  {loading ? "Generating PDF..." : "Download Certificate"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
}
