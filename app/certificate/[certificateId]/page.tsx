"use client";
import Certificate from "@/components/custom/Certificate";
import { Button } from "@/components/ui/button";
import { PDFRenderer, PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";

const styles = {
  page: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  border: {
    position: "absolute",
    top: "20px",
    left: "20px",
    right: "20px",
    bottom: "20px",
    border: "1pt solid #E5E7EB",
  },
  ribbon: {
    position: "absolute",
    top: 0,
    right: "80px",
    width: "200px",
    height: "100%",
    backgroundColor: "#F3F4F6",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 1,
    padding: "40px",
  },
  logo: {
    width: "120px",
    height: "30px",
    marginBottom: "60px",
    objectFit: "contain",
  },
  headerText: {
    position: "absolute",
    top: "40px",
    right: "100px",
    fontSize: 12,
    color: "#6B7280",
  },
  name: {
    fontSize: 24,
    color: "#111827",
    marginBottom: "10px",
  },
  courseText: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: "40px",
  },
  courseName: {
    fontSize: 18,
    color: "#111827",
    fontWeight: 700,
    marginBottom: "5px",
    width: "60%",
  },
  courseDescription: {
    fontSize: 12,
    color: "#6B7280",
    width: "60%",
  },
  signatureSection: {
    marginTop: "80px",
  },
  signature: {
    width: "120px",
    height: "40px",
    marginBottom: "10px",
  },
  signatureText: {
    fontSize: 10,
    color: "#6B7280",
  },
  seal: {
    position: "absolute",
    bottom: "40px",
    right: "120px",
    width: "120px",
    height: "120px",
    objectFit: "contain",
    zIndex: 100,
  },
  verifyText: {
    position: "absolute",
    bottom: "30px",
    left: "40px",
    fontSize: 8,
    color: "#9CA3AF",
  },
};

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function CertificateGenerator() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="grid place-items-center">
          {/* <PDFViewer width="100%" height="600px">
            <Certificate />
          </PDFViewer> */}
          <div className="">
            <div style={styles.page}>
              <div style={styles.border} />
              <div style={styles.ribbon} />
              <div style={styles.content}>
                <img style={styles.logo} src="/logo.png" />
                <p style={styles.headerText}>CSIABMC CERTIFICATE</p>

                <p style={styles.name}>BIPIN KHATRI</p>
                <p style={styles.courseText}>has completed:</p>

                <p style={styles.courseName}>Fudmantel to Web Developments</p>
                <p style={styles.courseDescription}>
                  an Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil quasi alias recusandae vitae unde doloribus sapiente
                  amet at accusamus optio.
                </p>

                <div style={styles.signatureSection}>
                  <img style={styles.signature} src="/logo.png" />
                  <p style={styles.signatureText}>Instructor Signature</p>
                </div>

                <img style={styles.seal} src="/logo.png" />

                <p style={styles.verifyText}>
                  Verify at csitabmc.com/certificate/CERT-
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <PDFDownloadLink
              document={<Certificate />}
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
