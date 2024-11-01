"use client";

import { Button } from "@/components/ui/button";
import { NoticeTypes } from "@/types/Notice";

const DownloadNotice = ({ notice }: { notice: NoticeTypes }) => {
  const handleDownload = async () => {
    if (notice) {
      try {
        const response = await fetch(notice.photo);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `notice-${notice.id}-photo.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };
  return <Button onClick={handleDownload}>Download Notice</Button>;
};

export default DownloadNotice;
