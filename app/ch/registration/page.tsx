"use client";
import React, { useState } from "react";
import { validateRegistration } from "@/app/actions/regestrationValidate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import StatusPage from "@/components/custom/Statuspage";

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

const RegistrationValidation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      const data = await validateRegistration(name as string, email as string);
      setResult(data as ValidationResult);
    } catch (error) {
      setResult({
        exists: false,
        nameMatch: false,
        paid: false,
        message: "An error occurred. Please try again later.",
      });
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto  max-w-2xl space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Event Registration Status</h1>
        <p className="text-gray-500">
          Enter your details to verify your registration status
        </p>
        <Image
          src="/FOWD.png"
          alt="form banner"
          width={500}
          height={300}
          className="rounded-md mx-auto"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Checking..." : "Check Status"}
        </Button>
      </form>

      {result && <StatusPage result={result} />}
    </div>
  );
};

export default RegistrationValidation;
