import React from "react";
import { format } from "date-fns";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import { CertificateTypes } from "@/types/certificate";

const Certificate = ({ data }: { data: CertificateTypes }) => (
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
          <Text style={styles.name}>{data.fullName}</Text>
        </View>
        <View>
          <Text style={styles.para}>
            in recognition of their participation in the workshop titled as{" "}
            <Text style={{ color: "red" }}> {data.event.title}</Text>, organized
            by the CSIT Association of BMC. The workshop was conducted from{" "}
            <Text style={{ color: "red" }}>
              {format(new Date(data.event.startDate), "MMMM do")} to{" "}
              {format(new Date(data.event.endDate), "MMMM do, yyyy")}
            </Text>
            . This certificate acknowledges their successful completion of the
            program.
          </Text>
        </View>
        <View style={styles.signs}>
          <View style={styles.qr}>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?data=https://csitabmc.com/certificate/${data.certificateID}&color=0c2044&bgcolor=F1F1F1`}
              style={{ objectFit: "contain", height: "100%" }}
            />
          </View>
          <View style={styles.signContainer}>
            <View style={styles.sign}>
              <Image
                src="/sign.png"
                style={{ objectFit: "contain", width: "12rem", height: "5rem" }}
              />
              <Text style={styles.signName}>Suman Bhattarai</Text>
              <Text>President</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default Certificate;
