import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await axios.post(
          "https://musician-project-be.onrender.com/auth/login",
          {
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await response.data.json();
        if (user && response.status) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      console.log(user)
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
