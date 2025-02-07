import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
} from "lucide-react";
import { TeamDetails } from "@/app/data";
import NotFound from "@/app/not-found";
import { metadata } from "@/app/layout";
import QueryString from "qs";
import { MemberTypes } from "@/types/Members";
import { fetchWithToken } from "@/lib/fetch";
import Markdown from "react-markdown";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const query = QueryString.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/members/${userId}?${query}`
  );
  if (!res || res.status !== 200) return <NotFound />;
  const resJson = await res.json();
  const profile: MemberTypes = resJson.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Profile Image and Basic Info */}
            <div className=" md:w-[30rem] md:pr-4">
              <div className="sticky top-24">
                <div className="relative w-full  aspect-[1/1] rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={profile.image?.url}
                    alt={profile.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profile.fullName}
                    </h1>
                    <p className="text-xl text-red-600 font-medium">
                      {profile.post}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={profile.facebookLink as string}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      aria-label="Facebook Profile"
                    >
                      <Facebook className="w-5 h-5" />
                    </Link>
                    <Link
                      href={profile.linkedLink as string}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link
                      href={profile.githubLink as string}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      aria-label="Github"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="space-y-3 pt-2 text-gray-600">
                    <Link
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{profile.email}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - About Section */}
            <div className="pt-4 w-full md:pt-0">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About {profile.fullName.split(" ")[0]}
                </h2>
                <Markdown className="markdown">{profile.description}</Markdown>
                <div className="flex flex-wrap gap-2">
                  {profile.tags?.split(",").map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
