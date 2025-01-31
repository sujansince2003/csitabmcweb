import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DiscIcon as Discord } from "lucide-react";
import { Button } from "../ui/button";

interface ValidationResult {
  exists: boolean;
  nameMatch: boolean;
  paid: boolean;
  message: string;
  name?: {
    status: boolean;
    message: string;
  };
  payment?: {
    status: boolean;
    message: string;
  };
  id?: string;
  card?: string;
}

interface StatusPageProps {
  result: ValidationResult;
}

export default function StatusPage({ result }: StatusPageProps) {
  const getStatusCard = () => {
    if (!result.exists) {
      return (
        <StatusCard
          status="error"
          title="Registration Not Found"
          description="No registration found with this email."
          details={{
            type: "register",
            content: "",
            link: "",
          }}
        />
      );
    }
    if (!result.nameMatch) {
      return (
        <StatusCard
          status="verified"
          title="Verified"
          description="Registration Verified, get your id card below"
          details={{
            type: "payment",
            content: "ID Card",
            imageUrl: `https://drive.google.com/uc?export=view&id=${result.card}`,
            contactInfo:
              "Your Name Doesn't match with the registration. Please contact us for further details.",
          }}
        />
      );
    }
    return (
      <StatusCard
        status="verified"
        title="Verified"
        description="Registration Verified, get your id card below"
        details={{
          type: "payment",
          content: "ID Card",
          imageUrl: `https://drive.google.com/uc?export=view&id=${result.card}`,
          contactInfo: "",
        }}
      />
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-8">{getStatusCard()}</div>
  );
}

interface StatusCardProps {
  status: "pending" | "verified" | "error";
  title: string;
  description: string;
  details: {
    type: "payment" | "discord" | "name" | "register";
    content: string;
    imageUrl?: string;
    link?: string;
    errorMessage?: string;
    contactInfo?: string;
  };
}

function StatusCard({ status, title, description, details }: StatusCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 p-6 shadow-lg transition-all hover:shadow-xl",
        status === "pending"
          ? "border-red-500"
          : status === "verified"
          ? "border-green-500"
          : "border-red-500"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            "w-full text-center text-xl font-bold",
            status === "pending"
              ? "text-red-500"
              : status === "verified"
              ? "text-green-500"
              : "text-red-500"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "h-3 w-3 rounded-full shadow-inner",
            status === "pending"
              ? "bg-red-500"
              : status === "verified"
              ? "bg-green-500"
              : "bg-red-500"
          )}
        ></span>
      </div>

      <div
        className={cn(
          "mb-4 rounded-lg p-4",
          status === "pending"
            ? "bg-red-100"
            : status === "verified"
            ? "bg-green-100"
            : "bg-red-50"
        )}
      >
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      <div className="space-y-3">
        <h3
          className={cn(
            "text-lg font-medium",
            status === "pending"
              ? "text-gray-800"
              : status === "verified"
              ? "text-green-600"
              : "text-gray-800"
          )}
        >
          {details.content}
        </h3>

        {details.type === "payment" && details.imageUrl && (
          <div>
            <div className=" w-full overflow-hidden rounded-lg  text-center ">
              <Image
                src={details.imageUrl}
                alt="Payment details"
                width={800}
                height={800}
                className="object-contain w-full max-h-80"
              />
            </div>
            <a href={details.imageUrl} download>
              <Button className="w-full bg-[#3063a1] hover:bg-blue-900 active:bg-blue-900 my-2">
                Download
              </Button>
            </a>

            {details.contactInfo && (
              <p className="text-black text-sm text-center rounded-md p-4 mt-2 bg-stone-200">
                <span className="text-red-600 font-semibold"> NOTE:</span>{" "}
                {details.contactInfo}
              </p>
            )}
          </div>
        )}

        {(details.type === "discord" || details.type === "name") &&
          details.link && (
            <div className="rounded-lg bg-green-50 p-4">
              <a
                href={details.link}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4752C4]"
              >
                <Discord className="mr-2 h-5 w-5" />
                Join Discord Server
              </a>
              <p className="mt-2 text-center text-xs text-gray-600">
                Direct link:{" "}
                <a
                  href={details.link}
                  className="text-[#5865F2] hover:underline"
                >
                  {details.link}
                </a>
              </p>
            </div>
          )}

        {details.type === "name" && details.errorMessage && (
          <div className="mt-6 space-y-3 rounded-lg bg-red-100 p-4">
            <h3 className="text-lg font-medium text-red-600">Name Incorrect</h3>
            <p className="text-sm text-gray-700">{details.errorMessage}</p>
            {details.contactInfo && (
              <p className="text-sm italic text-gray-600">
                {details.contactInfo}
              </p>
            )}
          </div>
        )}

        {details.type === "register" && details.link && (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-gray-700">
              Registration Link :{" "}
              <a href={details.link} className="text-blue-600 hover:underline">
                {details.link}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
