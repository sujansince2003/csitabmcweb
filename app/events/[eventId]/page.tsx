import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { eventDetails } from "@/app/data";
import NotFound from "@/app/not-found";
import { metadata } from "@/app/layout";

// This would typically come from your API or database
const eventData = {
  id: "1",
  title: "5 Days Workshop on Graphics Designing",
  image: "/placeholder.svg?height=600&width=1200",
  date: "13th - 17th Chaitra",
  time: "12:00 PM - 02:00 PM",
  location: "Butwal Multiple Campus, Butwal",
  category: "Workshop",
  description:
    "Join us for an intensive 5-day workshop on Graphics Designing. Learn from industry experts and enhance your skills in various design software and techniques. This workshop is perfect for beginners and intermediate designers looking to take their skills to the next level.",
  speakers: [
    {
      name: "Aashish Sharma",
      role: "Lead Designer at TechCorp",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Pradeep Pandey",
      role: "Freelance Illustrator",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Suman Gautam",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  organizer: "CSIT Association of BMC",
  ticketPrice: "Rs. 1000",
  availableSeats: 50,
};

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = (await params).eventId;
  const data = eventDetails;
  const myData = data.find((item) => item.id === eventId);
  if (!myData) {
    return <NotFound />;
  }

  metadata.title = myData.title;
  metadata.description = "CSIT Association of BMC Present - " + myData.title;
  metadata.openGraph = metadata.openGraph ?? {};
  metadata.openGraph.images = {
    url: myData.image,
    width: 1200,
    height: 600,
    alt: "CSIT-BMC",
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={myData.image}
          alt="banner image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/0 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <Badge className="mb-4">{eventData.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {myData.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{eventData.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{eventData.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{eventData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About the Event</h2>
            <p className="text-gray-600 mb-8">{eventData.description}</p>

            <h2 className="text-2xl font-bold mb-4">Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {eventData.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={speaker.image} alt={speaker.name} />
                    <AvatarFallback>
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{speaker.name}</p>
                    <p className="text-sm text-gray-500">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.340063442644!2d83.46040731506156!3d27.700438982792193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996868a00000001%3A0x4a5f7f7a7c8e5d5a!2sButwal%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1635000000000!5m2!1sen!2snp"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="rounded-lg shadow-lg w-full"
              ></iframe>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Organizer: {eventData.organizer}</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Available Seats: {eventData.availableSeats}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-2xl">
                    {eventData.ticketPrice}
                  </span>
                </div>
              </div>
              <Button className="w-full">Register Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
