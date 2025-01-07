'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const InputForm = () => {
  const [certificateId, setCertificateId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/certificate/${certificateId}`);
  };
  return (
    <>
      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search by Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>
    </>
  );
};

export default InputForm;
