import React from "react";
import DownloadCertificate from "./DownloadCertificate";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

import { metadata } from "@/app/layout";
import NotFound from "@/app/not-found";
import { fetchWithToken } from "@/lib/fetch";
import { CertificateTypes } from "@/types/certificate";
import QueryString from "qs";

const CertificateData = async ({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) => {
  const { certificateId } = await params;
  const query = QueryString.stringify({
    populate: {
      event: {
        fields: ["title", "startDate", "endDate"],
      },
    },
  });
  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/certificates/${certificateId}?${query}`
  );
  if (!res || res.status !== 200) {
    return (
      <NotFound
        heading="Certificate Not Found"
        message="The certificate you're looking for doesn't exist or has been moved."
      />
    );
  }
  const resJson = await res.json();
  const data: CertificateTypes = resJson.data;

  metadata.title = data.fullName + " | Certified";
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
                  {data.fullName}
                </h3>
              </div>
              <div className="max-w-[650px] m-auto">
                <p className="text-center text-[13.1px] font-montserrat text-black leading-[25px]">
                  in recognition of their participation in the workshop titled
                  as
                  <span className="text-[red] font-bold">
                    {" "}
                    {data.event.title}
                  </span>
                  , organized by the CSIT Association of BMC. The workshop was
                  conducted from
                  <span className="text-[red] font-bold">
                    {" "}
                    {format(new Date(data.event.startDate), "MMMM do")} to{" "}
                    {format(new Date(data.event.endDate), "MMMM do, yyyy")}
                  </span>
                  . This certificate acknowledges their successful completion of
                  the program.
                </p>
                <div className="flex justify-between pt-[20px]">
                  <div className="ml-10 h-[100px] w-[100px] flex items-end">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=https://csitabmc.com/certificate/${data.certificateID}&color=0c2044&bgcolor=F1F1F1`}
                      className="object-contain h-full"
                      style={{ objectFit: "contain", height: "100%" }}
                    />
                  </div>
                  <div className="flex flex-col mr-[70px]">
                    <img
                      src="/sign.png"
                      style={{
                        objectFit: "contain",
                        width: "12rem",
                        height: "5rem",
                      }}
                    />
                    <h4 className="border-t-2 text-[red] border-black mt-2 text-[18px]">
                      Suman Bhattarai
                    </h4>
                    <h4 className="text-black">President </h4>
                  </div>
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
};

export default CertificateData;
