import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(request: Request, props: { params: Promise<{ uniqueId: string }> }) {
    const params = await props.params;
    const { uniqueId } = params;


    try {
        // Extract `uniqueId` from params

        const certificate = await prisma.certificate.findUnique({
            where: { uniqueId },
            include: {
                event: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        department: true,
                    },
                },
            },
        });

        if (!certificate) {
            return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
        }

        return NextResponse.json(certificate);
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
