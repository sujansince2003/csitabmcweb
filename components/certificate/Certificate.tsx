import React from "react";
import ReactPDF, { Path, Svg } from "@react-pdf/renderer";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { styles } from "./style";

interface CertificateProps {
  name: string;
  course: string;
}

const Certificate = ({ data }: { data: string }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Image src="/certificate.png" style={styles.pageBackground} />
      <View style={styles.head}>
        <View style={styles.batchA}></View>
        <View style={styles.copContainer}>
          <View style={styles.cop}>
            <Text>CERTIFICATE</Text>
            <Text style={{ paddingVertical: "15px" }}>OF COMPLETION</Text>
          </View>
          <Text style={styles.awardedTo}>
            This award is proudly presented to
          </Text>
        </View>
        <View style={styles.batch}></View>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.name}>Bipin Khatri</Text>
        </View>
        <View>
          <Text style={styles.para}>
            This certificate is provided to name name name, for their attendance
            in 6-days workshop on Fundamentals of Web Development, organized by
            CSIT Associaiton of BMC from January 3rd to January 8th. They
            successfully completed this course. something something something
          </Text>
        </View>
        <View style={styles.signs}>
          <View style={styles.qr}>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${data}&color=0c2044&bgcolor=F1F1F1`}
              style={{ objectFit: "contain", height: "100%" }} 
            ></Image>
          </View>
          <View style={styles.signContainer}>
            <View style={styles.sign}>
            <Image
              src="http://localhost:3000/sign.png"
              style={{ objectFit: "contain", width:"12rem",height: "5rem" }} 
              ></Image>
              <Text style={styles.signName}>Suman Bhattatai</Text>
              <Text>President</Text>
              </View>

          </View>
        </View>
      </View>
    </Page>
  </Document>
);
export default Certificate;
