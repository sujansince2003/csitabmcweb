
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials;
                if (!email || !password) return null;

                const userExist = await prisma.user.findUnique({ where: { email } });
                if (!userExist) return null;

                const userData = userExist;

                const isPasswordValid = await bcrypt.compare(password, userData.password);
                if (!isPasswordValid) return null;

                return {
                    id: userData.id,
                    email: userData.email,
                    password: userData.password,
                    role: userData.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};


