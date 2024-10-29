// app/notices/NoticesList.tsx (Client Component)
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Notice {
  id: string;
  photo: string;
  title: string;
  description: string;
  publishedBy: string;
  publishedDate: string;
  publisherAvatar: string;
}

interface NoticesListProps {
  notices: Notice[];
}

export default function NoticesList({ notices }: NoticesListProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">College Notices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <Card key={notice.id} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={notice.photo}
                alt={notice.title}
                width={300}
                height={200}
                className="w-full h-48 object-contain rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-xl mb-2">{notice.title}</CardTitle>
              <p className="text-muted-foreground mb-4">{notice.description}</p>
              <Button onClick={() => router.push(`/notices/${notice.id}`)}>
                View Notice
              </Button>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 bg-muted">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
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
                  <p className="text-sm font-medium">{notice.publishedBy}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notice.publishedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
