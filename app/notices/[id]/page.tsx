import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { NoticeTypes } from "@/types/Notice";
import {
  Calendar,
  Download,
  FileText,
  MessageSquare,
  Share2,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import DownloadNotice from "./DownloadNotice";
import { getLocalDate } from "@/lib/data";

export default async function NoticeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const noticeId = (await params).id.split("_")[0];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${noticeId}`
  );
  const notice: NoticeTypes = await res.json();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-2 capitalize">{notice.category}</Badge>
              <CardTitle className="text-2xl font-bold">
                {notice.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Posted on {getLocalDate(notice.publishedDate)}
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base mb-4">{notice.description}</p>
          <Image
            src={
              notice.photo !== ""
                ? notice.photo
                : "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
            }
            width={800}
            height={400}
            alt="Exam Routine"
            className="rounded-lg border w-full h-full max-h-80 object-contain"
          />
          <div className="flex justify-end py-5">
            <DownloadNotice notice={notice} />
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div className="space-y-8">
        {/* <h2 className="text-xl font-semibold">Comments (0)</h2> */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your comment here..."
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button disabled>Post Comment</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
