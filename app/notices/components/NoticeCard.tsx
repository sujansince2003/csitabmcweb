import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Bell, Calendar, Search, Star } from "lucide-react";
import { NoticeTypes } from "@/types/Notice";
import DownloadNotice from "../[id]/DownloadNotice";
import { getLocalDate } from "@/lib/data";

export const NoticeCardComponent = ({ notice }: { notice: NoticeTypes }) => (
   
  <Link href={`notices/${notice.id}_${notice.title}`}>
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="grid gap-1 h-14">
          <CardTitle>{notice.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            Important regarding upcoming examinations
          </CardDescription>
        </div>
        <Badge variant="secondary" className="ml-auto capitalize">
          {notice.category}
        </Badge>
      </CardHeader>
      <CardContent>
        <Image
          src={
            notice.photo !== ""
              ?notice.photo
              : "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
          }
          width={800}
          height={400}
          alt="Exam Routine"
          className="rounded-lg border w-full h-48 object-contain"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {getLocalDate(notice.publishedDate)}
        </div>
        
        <DownloadNotice notice={notice}/>
      </CardFooter>
    </Card>
  </Link>
);
