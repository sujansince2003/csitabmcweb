"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, MapPin, Phone, User, Download } from "lucide-react";
import { useEffect, useState, use } from "react";

interface Notice {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  photo: string;
  publishedDate: string;
  publishedBy: string;
  publisherTitle: string;
  publisherAvatar: string;
  department: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  category: string;
  tags: string[];
}

export default function NoticeDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const noticeId = params.id.split("_")[0];
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    async function fetchNotice() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${noticeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notice");
        }
        const data = await response.json();
        setNotice(data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    }
    fetchNotice();
  }, [params.id]);

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

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button onClick={() => router.push("/notices")} className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Notices
      </Button>
      <Card className="overflow-hidden">
        <div className="relative pb-10   ">
          <Image
            src={notice.photo}
            alt={notice.title}
            width={700}
            height={400}
            className=" object-cover"
          />
          <Button
            onClick={handleDownload}
            className="absolute  bottom-0 right-4 bg-white text-black hover:bg-gray-200"
          >
            <Download className="md:mr-2 h-2 w-2 md:h-4  md:w-4" />
            <span className="hidden md:inline">Download Photo</span>
          </Button>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {notice.title}
              </CardTitle>
              <p className="text-muted-foreground mb-4">{notice.description}</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {notice.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage
                src={notice.publisherAvatar}
                alt={notice.publishedBy}
              />
              <AvatarFallback>
                {notice.publishedBy
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{notice.publishedBy}</p>
              <p className="text-sm text-muted-foreground">
                {notice.publisherTitle}
              </p>
              <p className="text-sm text-muted-foreground">
                {notice.publishedDate}
              </p>
            </div>
          </div>
          <div className="prose max-w-none mb-6">
            <h2 className="text-xl font-semibold mb-4">Full Notice</h2>
            <p className="whitespace-pre-line">{notice.fullContent}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>{notice.department}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
              <a
                href={`mailto:${notice.contactEmail}`}
                className="text-primary hover:underline"
              >
                {notice.contactEmail}
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
              <a
                href={`tel:${notice.contactPhone}`}
                className="text-primary hover:underline"
              >
                {notice.contactPhone}
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>{notice.location}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {notice.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
