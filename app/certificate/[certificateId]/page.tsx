"use client";
import React from "react";

const styles = {
  page: {
    width: "842px",
    height: "595px",
    flexDirection: "column" as "column",
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
    zIndex: 0,
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
    right: "100px",
    width: "120px",
    height: "120px",
  },
  verifyText: {
    position: "absolute",
    bottom: "30px",
    left: "40px",
    fontSize: 8,
    color: "#9CA3AF",
  },
};

export default function CertificateGenerator() {
  // StreamPDF;
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="border p-4 h-[40rem] bg-white shadow-lg">
          {/* <PPDFF/> */}
          <div className=" overflow-hidden">
            {/* <Certificate /> */}
            <div>
              <div style={styles.page}>
                <div style={styles.border} />
                <div style={styles.ribbon} />
                <div style={styles.content}>
                  <img
                    style={styles.logo}
                    src="/placeholder.svg?height=30&width=120"
                  />
                  <p style={styles.headerText}>COURSE CERTIFICATE</p>

                  <p style={styles.name}>{"name"}</p>
                  <p style={styles.courseText}>has completed:</p>

                  <p style={styles.courseName}>{"course"}</p>
                  <p style={styles.courseDescription}>
                    an online non-credit course authorized by Coursera and
                    offered through Coursera
                  </p>

                  <div style={styles.signatureSection}>
                    <img
                      style={styles.signature}
                      src="/placeholder.svg?height=40&width=120"
                    />
                    <p style={styles.signatureText}>Instructor Signature</p>
                  </div>

                  <img
                    style={styles.seal}
                    src="/placeholder.svg?height=120&width=120"
                  />

                  <p style={styles.verifyText}>
                    Verify at coursera.org/verify/CERT-
                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
