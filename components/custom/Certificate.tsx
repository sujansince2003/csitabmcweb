import React from "react";
import ReactPDF from "@react-pdf/renderer";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register custom fonts for a more professional look

const styles = StyleSheet.create({
  page: {
    width: "820px",
    height: "480px",
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
});
interface CertificateProps {
  name: string;
  course: string;
}

const Certificate = () => (
  <Document>
    <Page size={[820, 480]} style={styles.page}>
      <View style={styles.border} />
      <View style={styles.ribbon} />
      <View style={styles.content}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.headerText}>CSITABMC CERTIFICATE</Text>

        <Text style={styles.name}>BIPIN KHATRI</Text>
        <Text style={styles.courseText}>has completed:</Text>

        <Text style={styles.courseName}>Fudmantel to Web Developments</Text>
        <Text style={styles.courseDescription}>
          an Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
          quasi alias recusandae vitae unde doloribus sapiente amet at accusamus
          optio.
        </Text>

        <View style={styles.signatureSection}>
          <Image style={styles.signature} src="/logo.png" />
          <Text style={styles.signatureText}>Instructor Signature</Text>
        </View>

        <Image style={styles.seal} src="/logo.png" />

        <Text style={styles.verifyText}>
          Verify at csitabmc.com/certificate/CERT-
          {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </Text>
      </View>
    </Page>
  </Document>
);
export default Certificate;
