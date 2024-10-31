// pages/api/notices/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
