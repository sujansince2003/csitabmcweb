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

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const profile = TeamDetails.find((item) => item.id === userId);
  if (!profile) return <NotFound />;

  metadata.title = profile.Name + " | CSIT Assocaiotn Of BMC";
  metadata.description = "CSIT Assocaiotn of BMC Team Member";
  metadata.openGraph = metadata.openGraph ?? {};
  metadata.openGraph.images = {
    url: profile.img,
    width: 1200,
    height: 600,
  };

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
                    src={profile.img}
                    alt={profile.Name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profile.Name}
                    </h1>
                    <p className="text-xl text-red-600 font-medium">
                      {profile.Post}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={profile.Facebook}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      aria-label="Facebook Profile"
                    >
                      <Facebook className="w-5 h-5" />
                    </Link>
                    <Link
                      href={profile.LinkedIn}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link
                      href="mailto:contact@example.com"
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      aria-label="Email"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <span>+977-9876543210</span>
                    </div>
                    <Link
                      href={`mailto:${profile.Email}`}
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{profile.Email}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - About Section */}
            <div className="pt-4 w-full md:pt-0">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About {profile.Name.split(" ")[0]}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Ut labore et dolore magna aliqua, ut enim ad minim veniam.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Leadership</Badge>
                  <Badge variant="secondary">Event Management</Badge>
                  <Badge variant="secondary">Team Coordination</Badge>
                  <Badge variant="secondary">Strategic Planning</Badge>
                  <Badge variant="secondary">Public Speaking</Badge>
                  <Badge variant="secondary">Project Management</Badge>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
