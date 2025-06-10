// app/authOptions.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "./utils/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const user = await userModel.findOne({ mail: credentials?.mail });
        console.log(user);
        if (!user || user.password !== credentials.password) {
          return null ;
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.mail,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },
});

export const { handlers, auth, signIn, signOut } = handler;
