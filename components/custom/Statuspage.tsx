import { cn } from "@/lib/utils";
import { DiscIcon as Discord } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ValidationResult {
  exists: boolean;
  nameMatch: boolean;
  paid: boolean;
  name?: {
    status: boolean;
  };
  IdCard?: string;
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
          description="No registration found with this email. For registration query: 9867418196"
          details={{
            type: "register",
            content: "",
            link: "",
          }}
        />
      );
    }
    if (!result.paid) {
      return (
        <StatusCard
          status="pending"
          title="Payment Pending"
          description="Your registration is recorded, but payment is incomplete. For payment query: 9849511233"
          details={{
            type: "payment",
            content: "",
            imageUrl:
              "https://res.cloudinary.com/dol8m5gx7/image/upload/v1738949671/payment_bmcevents_ye01zh_42de9ffa78.png",
            link: "https://discord.com/invite/DHAKx3Aees",
            contactInfo: "",
          }}
        />
      );
    }
    if (result.IdCard) {
      return (
        <StatusCard
          status="verified"
          title="Verified"
          description="Registration Verified"
          details={{
            type: "payment",
            content: "GET YOUR ID Card",
            link: "https://discord.com/invite/DHAKx3Aees",
            IdCard: result.IdCard,
            imageUrl: result.IdCard,
          }}
        />
      );
    }
    return (
      <StatusCard
        status="verified"
        title="Verified"
        description="Registration Verified"
        details={{
          type: "payment",
          content: "GET YOUR ID Card",
          link: "https://discord.com/invite/DHAKx3Aees",
          contactInfo:
            "ID card will be sent to your registered email once registration closes.",
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
    IdCard?: string;
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
        {details.imageUrl && (
          <>
            <div className=" w-full overflow-hidden rounded-lg  text-center ">
              <Image
                src={details.imageUrl}
                alt="Failed to get Card"
                width={800}
                height={800}
                className="object-contain w-full max-h-80 text-red-500"
              />
            </div>
            {details.IdCard && (
              <a href={details.imageUrl} download>
                <Button className="w-full bg-[#3063a1] hover:bg-blue-900 active:bg-blue-900 my-2">
                  Download
                </Button>
              </a>
            )}
          </>
        )}

        {details.errorMessage && (
          <p className="text-red-600 text-sm text-center rounded-md p-4 mt-2 bg-red-50">
            <span className="text-red-600 font-semibold">Error:</span>{" "}
            {details.errorMessage}
          </p>
        )}

        {details.contactInfo && (
          <p className="text-black text-sm rounded-md p-4 mt-2 bg-stone-200">
            <span className="text-red-600 font-semibold"></span>{" "}
            {details.contactInfo}
          </p>
        )}

        {details.link && (
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
              <a href={details.link} className="text-[#5865F2] hover:underline">
                {details.link}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
