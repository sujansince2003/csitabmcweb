"use client";

import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const DeleteNotice = ({
  id,
  setdeletedNotice,
}: {
  id: string;
  setdeletedNotice: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete notice");
      }
      setdeletedNotice((prev) => !prev);
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice");
    } finally {
      setIsDeleting(false);
    }
  }

  if (status === "loading") return null;
  if (session?.user.role !== "ADMIN") return null;

  return (
    <Button onClick={handleDelete} disabled={isDeleting} variant="destructive">
      <Trash2 className="mr-2 h-4 w-4" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteNotice;
