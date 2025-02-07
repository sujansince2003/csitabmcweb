import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import QueryString from "qs";
import { ArrowLeft, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { fetchWithToken } from "@/lib/fetch";
import type { NoticeTypes } from "@/types/Notice";
import Markdown from "react-markdown";

export default async function NoticeDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/notices/${id}?${query}`
  );

  if (!res || res.status !== 200) return notFound();

  const resJson = await res.json();
  const notice: NoticeTypes = resJson.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/notices" className="inline-block mb-6">
        <Button variant="outline" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notices
        </Button>
      </Link>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-[300px] md:h-[30rem]">
            <Image
              src={notice.image[0].url || "/placeholder.svg"}
              alt={notice.title}
              fill
              className="object-cover object-top rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <Badge variant="secondary" className="mb-4 capitalize">
                {notice.category}
              </Badge>
              <CardTitle className="text-3xl font-bold mb-4 transition-colors">
                {notice.title}
              </CardTitle>
              <Markdown className="markdown text-gray-700 mb-6 leading-relaxed">
                {notice.description}
              </Markdown>
            </div>
            <div className="flex justify-end">
              <Link href={notice.image[0].url} download>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Notice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
