import { TeamDetails } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
export default function TeamList() {
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="relative text-2xl font-medium text-center mb-12 pb-2">
          Our
          <span className="text-red-600"> Teams </span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[2px] bg-red-600" />
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {TeamDetails.map((member, index) => (
            <Link href={`/mb/${member.id}`} key={index} className=" bg-gray-100 p-4">
              <Image
                src={member.img}
                alt={member.Name}
                width={800}
                height={800}
                className="rounded-sm"
              />

              <div>
                <h3 className="text-lg font-semibold text-red-600">
                  {member.Name}
                </h3>
                <p className="text-gray-600">{member.Post}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
