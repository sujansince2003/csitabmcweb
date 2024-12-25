import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface StatusCardProps {
  status: "pending" | "verified" | "error";
  title: string;
  description: string;
  details?: {
    type: "payment" | "discord" | "name";
    content: string;
    imageUrl?: string;
    errorMessage?: string;
    contactInfo?: string;
  };
}

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
}

interface StatusPageProps {
  result: ValidationResult;
}

export default function StatusPage({ result }: StatusPageProps) {
  let cardProps: StatusCardProps;

  if (!result.exists) {
    cardProps = {
      status: "error",
      title: "Registration Not Found",
      description: "No registration found with this email.",
    };
  } else if (!result.nameMatch) {
    cardProps = {
      status: "pending",
      title: "Name Verification Pending",
      description: result.name?.message || "",
      details: {
        type: "name",
        content: "",
        errorMessage:
          "You have entered a different name. Make sure your name matches your student ID card. The same name will be on your certificate.",
        contactInfo:
          "For name correction, email team@csitabmc.com or raise your issue in Discord",
      },
    };
  } else if (!result.paid) {
    cardProps = {
      status: "pending",
      title: "Payment Pending",
      description:
        result.payment?.message ||
        "Payment is required to complete your registration",
      details: {
        type: "payment",
        content: "Payment Details",
        imageUrl: "/payment.png",
      },
    };
  } else {
    cardProps = {
      status: "verified",
      title: "Registration Verified",
      description: "Your registration has been verified successfully.",
      details: {
        type: "discord",
        content: "Join Discord",
        imageUrl: "https://discord.gg/6MVAkW3T",
      },
    };
  }

  return (
    <div className="container mx-auto p-6">
      <StatusCard {...cardProps} />
    </div>
  );
}

function StatusCard({ status, title, description, details }: StatusCardProps) {
  return (
    <Card
      className={cn(
        "p-6 border-2",
        status === "pending"
          ? "border-red-500"
          : status === "verified"
          ? "border-green-500"
          : "border-yellow-500"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span
          className={cn(
            "w-3 h-3 rounded-full",
            status === "pending"
              ? "bg-red-700"
              : status === "verified"
              ? "bg-green-500"
              : "bg-yellow-500"
          )}
        />
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {details && (
        <div className="space-y-4">
          <h3 className="font-medium">{details.content}</h3>

          {details.type === "payment" && details.imageUrl && (
            <div className="bg-blue-900 aspect-video relative">
              <Image
                src={details.imageUrl}
                alt="Payment details"
                fill
                className="object-cover"
              />
            </div>
          )}

          {details.type === "discord" && details.imageUrl && (
            <p className="text-sm">
              Joining Link :{" "}
              <a className="text-blue-500" href="https://discord.gg/6MVAkW3T">
                {details.imageUrl}
              </a>
            </p>
          )}

          {details.type === "name" && (
            <>
              {details.errorMessage && (
                <div className="mt-4">
                  <h4 className="text-red-500 font-medium mb-2">
                    Name Incorrect
                  </h4>
                  <p className="text-sm text-gray-600">
                    {details.errorMessage}
                  </p>
                  {details.contactInfo && (
                    <p className="text-sm text-gray-600 italic mt-2">
                      {details.contactInfo}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
}
