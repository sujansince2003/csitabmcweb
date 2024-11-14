import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { deleteCldImage } from "@/lib/cloudinary";


export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { error: "No data provided" },
        { status: 400 }
      );
    }

    // Ensure publishedDate is a valid Date object
    const publishedDate = new Date(body.publishedDate);
    if (isNaN(publishedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid published date" },
        { status: 400 }
      );
    }

    const notice = await prisma.notice.create({
      data: {
        title: body.title,
        description: body.description,
        fullContent: body.fullContent,
        photo: body.photo,
        photopublicId: body.photopublicId,
        publishedDate: publishedDate,
        publishedBy: body.publishedBy,
        department: body.department,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        location: body.location,
        category: body.category,
        tags: body.tags,

      },
    });
    return NextResponse.json(notice);
  } catch (error) {
    console.error("Error creating notice:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the notice." },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const notice = await prisma.notice.findUnique({
        where: { id },
      });
      if (!notice) {
        return NextResponse.json(
          { error: "Notice not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(notice);
    } else {
      const notices = await prisma.notice.findMany({
        orderBy: { publishedDate: "desc" },
      });

      return NextResponse.json(notices);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching noticesddd." },
      { status: 500 }
    );
  }
}


