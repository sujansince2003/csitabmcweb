import Image from "next/image";
import Link from "next/link";
import { MemberTypes } from "@/types/Members";
import qs from "qs";
export default async function TeamList() {
  const query = qs.stringify(
    {
      fields: ["fullName", "post", "memberId"],
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${process.env.STRAPI_API_URL}/members?${query}`);
  const resJson = await res.json();
  const TeamDetails: MemberTypes[] = resJson.data;

  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="relative text-2xl font-medium text-center mb-12 pb-2">
          Our
          <span className="text-red-600"> Teams </span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[2px] bg-red-600" />
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {TeamDetails.map((member: MemberTypes, index: number) => (
            <Link
              href={`/mb/${member.memberId}`}
              key={index}
              className=" bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-500 p-4 "
            >
              <Image
                src={member.image.url}
                alt={member.fullName}
                width={200}
                height={200}
                className="rounded-sm"
              />

              <div className="text-center pt-2">
                <h3 className="text-base font-semibold text-red-600">
                  {member.fullName}
                </h3>
                <p className="text-gray-600 text-sm">{member.post}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
