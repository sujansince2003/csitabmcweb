import React from "react";
import DownloadCertificate from "./DownloadCertificate";
import { Card, CardContent } from "@/components/ui/card";

import { metadata } from "@/app/layout";

export interface CertificateData {
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

const CertificateData = async ({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) => {
  const { certificateId } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/${certificateId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch certificate");
    }
    const data = await response.json();
    metadata.title = data.participantName + " | Certified";
    metadata.description = "CSIT Assocaiotn of BMC Certificate Verification";
    metadata.openGraph = metadata.openGraph ?? {};
    metadata.openGraph.images = {
      url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png",
      width: 1200,
      height: 600,
    };
    return (
      <div>
        <Card>
          <CardContent className="pt-6 overflow-y-scroll">
            <div
              className="mt-4 w-[800px] h-[565.6px] rounded-md m-auto text-center border text-gray-400"
              style={{
                backgroundImage: "url('/certificate.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div>
                <h2 className="font-cardo uppercase pt-[70px] text-black tracking-[6px] font-bold text-[27px]">
                  Certificate
                  <br />
                  of Completion
                </h2>
              </div>
              <div>
                <h3 className="font-[20px] pt-[15px] font-montserrat text-black">
                  this award is proudly presented to{" "}
                </h3>
              </div>
              <div id="body" className="pt-[30px] ">
                <div className="">
                  <h3 className="text-[3rem] overflow-hidden font-greatVibes text-[red] capitalize text-center">
                    {data.participantName}
                  </h3>
                </div>
                <div className="max-w-[650px] m-auto">
                  <p className="text-center text-[13.1px] font-montserrat text-black">
                    in recognition of their participation in the workshop titled
                    as
                    <span className="text-[red] font-bold">
                      {" "}
                      Fundamentals of web development
                    </span>
                    , organized by the CSIT Association of BMC. The workshop was
                    conducted from
                    <span className="text-[red] font-bold">
                      {" "}
                      January 3rd to January 8th, 2025
                    </span>
                    . This certificate acknowledges their successful completion
                    of the program.
                  </p>
                  <div className="flex justify-between pt-[30px]">
                    <div>Qr</div>
                    <div>Sign</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center mb-4">
          <DownloadCertificate certificateData={data} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Certificate Not Found</h1>
        <div>the certificate id : {certificateId}</div>
      </div>
    );
  }
};

export default CertificateData;
