import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const notice = await prisma.notice.create({
            data: {
                title: body.title,
                description: body.description,
                fullContent: body.fullContent,
                photo: body.photo,
                publishedDate: new Date(body.publishedDate),
                publishedBy: body.publishedBy,
                department: body.department,
                contactEmail: body.contactEmail,
                contactPhone: body.contactPhone,
                location: body.location,
                category: body.category,
                tags: body.tags,
            },
        })
        return NextResponse.json(notice)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'An error occurred while creating the notice.' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    try {
        if (id) {
            const notice = await prisma.notice.findUnique({
                where: { id },
            })
            if (!notice) {
                return NextResponse.json({ error: 'Notice not found' }, { status: 404 })
            }
            return NextResponse.json(notice)
        } else {
            const notices = await prisma.notice.findMany({
                orderBy: { publishedDate: 'desc' },
            })
            return NextResponse.json(notices)
        }
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching notices.' }, { status: 500 })
    }
}