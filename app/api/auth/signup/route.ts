import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        const userExists = await prisma.user.findUnique({ where: { email } })
        if (userExists) return NextResponse.json({ message: "User Already exists.Please Login" })

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER"
            }
        })

        return NextResponse.json({
            message: "User Created Successfully",
            userData: user
        }, { status: 200 })


    } catch (error) {

        return NextResponse.json({ message: "An Error occured while Creating user", error }, { status: 500 })
    }
}