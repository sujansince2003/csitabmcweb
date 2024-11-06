// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        role: string
    }

    interface Session {
        user: {
            id: string
            role: string
            email: string
        }
    }

    interface JWT {
        id: string
        email: string
        role: string
    }
}
