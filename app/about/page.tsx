import React from "react";
import Image from "next/image";
import TeamList from "@/app/mb/[id]/TeamList";

export default function About() {
  return (
    <>
      <section className="py-16 px-4 md:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-[4/3] relative">
                <Image
                  src="https://res.cloudinary.com/dol8m5gx7/image/upload/v1723188288/team2081_wq5hob.jpg"
                  alt="CSIT Association team members"
                  fill
                  className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0  group-hover:bg-black/5 transition-colors duration-300 rounded-2xl" />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-red-600">About Us</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>CSIT Association of BMC </strong>
                  is a non-profitable organization inside Butwal Multiple Campus
                  created for the welfare of CSIT Students by the CSIT students
                  and operating actively since 2016.
                </p>

                <p className="text-gray-600">
                  We have been conducting several tech and non-tech workshops
                  internally and helping students to connect with national tech
                  community. Similarly, we also play a part in assisting our
                  college department for technical assistance and provide
                  suggestions based on technology criteria.
                </p>

                <p className="text-gray-600">
                  We believe that the students should be provided with the
                  relevant skills and platform to prepare them for their career
                  and at last we are at Butwal Multiple Campus with the motive
                  of helping students to address their problem as well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamList />
    </>
  );
}
