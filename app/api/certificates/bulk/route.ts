import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Expecting an array of participant data
        const { participants, eventId } = body;

        if (!participants || participants.length === 0 || !eventId) {
            return NextResponse.json({ error: 'Participants and eventId are required' }, { status: 400 });
        }

        const certificates = await prisma.certificate.createMany({
            data: participants.map((participant: { participantName: string }) => ({
                participantName: participant.participantName,
                eventId: eventId,
                uniqueId: uuidv4(),
            })),
            // Optional: Prevent duplicate certificates
        });

        return NextResponse.json({ success: true, count: certificates.count });
    } catch (error) {
        console.error('Error generating certificates:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
