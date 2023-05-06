import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({}),
  ],
  pages: ["/", "/products", "/cart", "/categories"],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});

export async function isLogin(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.email) {
    res.status(401);
    res.end();
    throw "not Login";
  }
}
