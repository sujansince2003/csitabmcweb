import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CloudOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <CloudOff className="mx-auto h-24 w-24 text-gray-400" />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/" passHref>
            <Button className="inline-flex items-center px-6 py-3 ">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Homepage
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you believe this is a mistake, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
