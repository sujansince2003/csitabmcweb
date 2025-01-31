import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchWithToken } from "@/lib/fetch";
import QueryString from "qs";
import { MentorTypes } from "@/types/mentors";
import Link from "next/link";

const EventMentor = async ({ id }: { id: string }) => {
  const query = QueryString.stringify({
    fields: ["fullName", "socialLink", "role"],
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/mentors/${id}?${query}`
  );
  if (!res || res.status !== 200) {
    console.error("Failed to fetch mentor", res);
    return null;
  }
  const resJson = await res.json();
  const mentor: MentorTypes = resJson.data;

  return (
    <Link
      href={mentor.socialLink}
      target="_blank"
      className="flex items-center space-x-4 hover:bg-gray-100 active:bg-gray-200 duration-300 p-4 rounded-md"
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={mentor.image.url} alt={mentor.fullName} />
        <AvatarFallback>
          {mentor.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{mentor.fullName}</p>
        <p className="text-sm text-gray-500">{mentor.role}</p>
      </div>
    </Link>
  );
};

export default EventMentor;
