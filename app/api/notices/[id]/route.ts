// pages/api/notices/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { delay } from 'framer-motion';
import { deleteCldImage } from '@/lib/cloudinary';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    try {
        const notice = await prisma.notice.findUnique({
            where: { id },
        });

        if (!notice) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }

        return NextResponse.json(notice);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching the notice.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }




        if (!id) {
            return NextResponse.json(
                { error: "Notice ID is required" },
                { status: 400 }
            );
        }

        const notice = await prisma.notice.findUnique({
            where: { id },
        });

        if (!notice) {
            return NextResponse.json(
                { error: "Notice not found" },
                { status: 404 }
            );
        }
        await deleteCldImage(notice.photopublicId as string)
        await prisma.notice.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Notice deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting notice:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the notice." },
            { status: 500 }
        );
    }
}