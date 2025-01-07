"use client";
import React from "react";
import Certificate from "@/components/certificate/Certificate";
import { PDFViewer } from "@react-pdf/renderer";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component

const page = () => {
  return <div>Certificate page</div>;
};

export default page;
