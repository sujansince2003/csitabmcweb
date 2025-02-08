import Image from "next/image";
import { Clock, MapPin, Video } from "lucide-react";
import { eventDetails } from "@/app/data";
import QueryString from "qs";
import { fetchWithToken } from "@/lib/fetch";
import NotFound from "../not-found";
import { EventTypes } from "@/types/events";
import Link from "next/link";
import EventDates from "./[eventId]/EventDates";

export default async function Event() {
  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/events?${query}`
  );
  const resJson = await res.json();
  const eventDetails: EventTypes[] = resJson.data;
  if (!res || res.status !== 200) return <NotFound />;

  eventDetails.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="relative pb-2 text-2xl font-medium text-center mb-12">
          <span className="text-red-600">Some Events</span> Organized By
          CSITA-BMC
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-[2px] bg-red-600" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {eventDetails.map((event, index) => (
            <div key={index}>
              <Link
                href={`events/${event.documentId}`}
                className="block h-full group"
              >
                <div className=" h-full relative bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
                  <div className="relative h-64">
                    <Image
                      src={event.image[0].url}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-full">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {event.title}
                    </h3>

                    {(event.startDate || event.location) && (
                      <div className="space-y-2 text-gray-600">
                        {event.startDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              <EventDates
                                startDate={event.startDate}
                                endDate={event.endDate}
                              />
                            </span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            {event.location == "Google Meet" ? (
                              <Video className="w-5 h-5 mr-2" />
                            ) : (
                              <MapPin className="w-5 h-5 mr-2" />
                            )}
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
