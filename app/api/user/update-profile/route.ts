import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteCldImage } from "@/lib/cloudinary";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const { name, email, imageurl, imagepublicId: newimagepublicId, department, semester, bio, location } =
            await request.json();

        if (email !== session.user.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                imagepublicId: true
            }
        })
        const oldImagePublicId = user?.imagepublicId;
        if (oldImagePublicId !== newimagepublicId) {
            try {
                await deleteCldImage(oldImagePublicId as string)
            } catch (error) {
                console.error('Error deleting old image:', error)

            }

        }


        const updateUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name,
                imageurl,
                imagepublicId: newimagepublicId,
                department,
                semester,
                bio,
                location,
            },
        });
        return NextResponse.json({
            user:
            {
                name: updateUser.name,
                email: updateUser.email,
                imageurl: updateUser.imageurl,
                department: updateUser.department,
                semester: updateUser.semester,
                bio: updateUser.bio,
                location: updateUser.location
            }
        });
    } catch (error) {
        console.error('Error updating user profile:', error)
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                imageurl: true,
                department: true,
                semester: true,
                bio: true,
                location: true,
                role: true,
            }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Error fetching user profile:', error)
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
    }
}