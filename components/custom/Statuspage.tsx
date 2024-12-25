import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

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
    return (
      <div className="rounded-xl border-2 border-red-500 p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="w-full text-center text-xl font-bold text-red-500">
            Registration Not Found
          </span>
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-inner"></span>
        </div>
        <div className="rounded-lg bg-red-50 p-4">
          <h3 className="mb-2 text-lg font-medium">Register Now</h3>
          <p className="text-sm text-gray-700">
            Your Email Id is not found in our Record.{" "}
          </p>
          <p className="text-sm text-gray-700">
            <a href="https://forms.gle/HuyEfKSYgJfNs6zM9">
              <Button className="my-2 w-full">Register Now</Button>
            </a>
            <p className="mt-2 text-center text-xs text-gray-600">
              Direct link:{" "}
              <a
                href="https://forms.gle/HuyEfKSYgJfNs6zM9"
                className="text-[#5865F2] hover:underline"
              >
                https://forms.gle/HuyEfKSYgJfNs6zM9
              </a>
            </p>
          </p>
        </div>
      </div>
    );
  }
  if (!result.paid) {
    return (
      <div className="rounded-xl border-2 border-red-500 p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="w-full text-center text-xl font-bold text-red-500">
            Payment Pending
          </span>
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-inner"></span>
        </div>
        <div className="mb-4 rounded-lg bg-red-100 p-4">
          <p className="text-sm text-gray-700">
            IT may take some time to reflect the payment after sending money.
            For payment Enquery:{" "}
            <a href="tel:989849511233" className="font-bold">
              9849511233
            </a>
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">Payment details</h3>
          <Image
            src="/payment.png"
            alt="Payment details"
            width={500}
            height={300}
            className="rounded-md mx-auto"
          />
        </div>
      </div>
    );
  }

  if (!result.nameMatch) {
    return (
      <div className="rounded-xl border-2 border-green-500 p-6 shadow-lg transition-all hover:shadow-xl">
        <Verified />
        <div className="mt-6 space-y-3 rounded-lg bg-red-100 p-4">
          <h3 className="text-lg font-medium text-red-600">Name Incorrect</h3>
          <p className="text-sm text-gray-700">
            You have entered a different name. Make sure your name matches your
            student ID card. The same name will be on your certificate.
          </p>
          <p className="text-sm italic text-gray-600">
            For name correction, email team@csitabmc.com or drop your issue in
            discord.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border-2 border-green-500 p-6 shadow-lg transition-all hover:shadow-xl">
      <Verified />
    </div>
  );
}

const Verified = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span className="w-full text-center text-xl font-bold text-green-500">
          Verified
        </span>
        <span className="h-3 w-3 rounded-full bg-green-500 shadow-inner"></span>
      </div>
      <div className="mb-4 rounded-lg bg-green-100 p-4">
        <p className="text-sm text-gray-700">
          Your Registration is Booked. Keep checking your mail and discord for
          further update.
        </p>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg bg-green-50 p-4">
          <h3 className="text-lg font-medium">Join Discord</h3>
          <a
            href="https://discord.gg/6MVAkW3T"
            className=" my-2 inline-flex w-full items-center justify-center rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4752C4]"
          >
            <DiscordLogoIcon className="mr-2 h-5 w-5" />
            Join Discord Server
          </a>
          <p className="mt-2 text-center text-xs text-gray-600">
            Direct link:{" "}
            <a
              href="https://discord.gg/6MVAkW3T"
              className="text-[#5865F2] hover:underline"
            >
              https://discord.gg/6MVAkW3T
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
