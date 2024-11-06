

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req: request, secret })
    const isAuthenticated = !!token

    const isAuthPage = path.startsWith('/login') || path.startsWith('/signup')

    if (isAuthPage) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        return null
    }


    if (!isAuthenticated) {
        let from = request.nextUrl.pathname
        if (request.nextUrl.search) {
            from += request.nextUrl.search
        }
        return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, request.url))
    }
    if (request.nextUrl.pathname.startsWith("/api/notices") && request.method !== "GET") {
        if (token?.role !== "ADMIN" && token?.role !== "FACULTY") {

            return new NextResponse(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            )
        }

    }
    return NextResponse.next()


}
export const config = {
    matcher: ['/notices/addnotice', "/login"]
}