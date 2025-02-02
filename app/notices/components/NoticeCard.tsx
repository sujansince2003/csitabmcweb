import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Download } from "lucide-react";
import { NoticeTypes } from "@/types/Notice";
import { getLocalDate } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const NoticeCardComponent = ({ notice }: { notice: NoticeTypes }) => {
  return (
    <Card>
      <Link href={`notices/${notice.documentId}`} passHref>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="grid gap-1 h-14">
            <CardTitle>{notice.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {notice.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-auto capitalize">
            {notice.category}
          </Badge>
        </CardHeader>
        <CardContent>
          <Image
            src={
              notice.image[0].url !== ""
                ? (notice.image[0].url as string)
                : "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
            }
            width={800}
            height={400}
            alt={notice.title}
            className="rounded-lg border w-full h-48 object-contain"
          />
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {getLocalDate(notice.publishedAt)}
        </div>
        <Link href={notice.image[0].url} download>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Notice
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
