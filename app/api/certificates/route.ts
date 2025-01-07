import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const certificate = await prisma.certificate.create({
            data: {
                ...body,
                uniqueId: uuidv4(),
            },
        });
        return NextResponse.json(certificate);
    } catch (error) {
        console.error('Error creating certificate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

