import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, ExternalLink, Video } from "lucide-react";
import NotFound from "@/app/not-found";
import { fetchWithToken } from "@/lib/fetch";
import { EventTypes } from "@/types/events";
import QueryString from "qs";
import Markdown from "react-markdown";
import EventDates from "./EventDates";
import EventTime from "./EventTime";
import EventMentor from "./EventMentor";
import Link from "next/link";
import EventRegistrationFee from "./EventRegistrationFee";

// fetch event data from strapi
const fetchEventData = async (eventId: string) => {
  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
      mentors: {
        fields: ["documentId"],
      },
    },
  });
  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/events/${eventId}?${query}`
  );
  if (!res || res.status !== 200) return <NotFound />;
  const resJson = await res.json();
  return resJson.data;
};

// set metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = (await params).eventId;
  const event: EventTypes = await fetchEventData(eventId);
  return {
    title: event.title,
    description: `CSIT Association of BMC Present - ${event.title}`,
    openGraph: {
      images: [
        {
          url: event.image[0].url,
          width: 1200,
          height: 600,
          alt: "CSIT-BMC",
        },
      ],
    },
  };
}

// EventPage
export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = (await params).eventId;
  const event: EventTypes = await fetchEventData(eventId);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={event.image[0].url}
          alt="banner image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/0 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <Badge className="mb-4">{event.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <EventDates startDate={event.startDate} endDate={event.endDate} />
              <EventTime startTime={event.startTime} endTime={event.endTime} />
              <div className="flex items-center">
                {event.location == "Google Meet" ? (
                  <Video className="w-5 h-5 mr-2" />
                ) : (
                  <MapPin className="w-5 h-5 mr-2" />
                )}
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 ">
            <h2 className="text-2xl font-bold mb-4">Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {event.mentors.map((mentor, index) => (
                <EventMentor key={index} id={mentor.documentId} />
              ))}
            </div>
            <h2 className="border-b border-gray-200 py-2 mb-4 font-semibold text-xl">
              About Event
            </h2>
            <Markdown className="markdown">{event.description}</Markdown>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Organizer: {event.organizer}</span>
                </div>
                {!!event.availableSeats && (
                  <div className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2 text-gray-500" />
                    <span>Available Seats: {event.availableSeats}</span>
                  </div>
                )}
                <EventRegistrationFee
                  registrationFeeBMC={event.registrationFeeBMC}
                  registrationFee={event.registrationFee}
                />
              </div>

              {(event.registrationFeeBMC || event.registrationFee) &&
                event.registrationOpen && (
                  <Link href="/check/registration">
                    <Button className="w-full mb-2" variant="secondary">
                      Verify Registration
                    </Button>
                  </Link>
                )}

              {event.registrationOpen && event.registrationFormUrl ? (
                <Link href={event.registrationFormUrl} target="_blank">
                  <Button className="w-full">Register Now</Button>
                </Link>
              ) : (
                <Button className="w-full" disabled>
                  Registration Closed
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
