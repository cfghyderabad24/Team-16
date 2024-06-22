// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "@/models/userModel";
// import bcrypt from "bcryptjs";
// import { dbConnect } from "@/utils/mongo";

// const handler = NextAuth({
//     session: {
//         strategy: "jwt",
//     },
//     pages: {
//         signIn: "/",
//     },
//     secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
//     providers: [
//         CredentialsProvider({
//             credentials: {
//                 email: {},
//                 password: {},
//             },
//             async authorize(credentials) {
//                 if (credentials === null) return null;

//                 try {
//                     const conn = await dbConnect();
//                     const user = await User.findOne({
//                         email: credentials?.email,
//                     });
//                     console.log(user);
//                     if (user) {
//                         const isMatch = await bcrypt.compare(
//                             credentials.password,
//                             user.password
//                         );

//                         if (isMatch) {
//                             return user;
//                         } else {
//                             throw new Error("Email or Password is not correct");
//                         }
//                     } else {
//                         throw new Error("User not found");
//                     }
//                 } catch (error) {
//                     throw new Error(error);
//                 }
//             },
//         }),
//     ],
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/utils/mongo";
import { User } from "@/models/userModel";
import { Frontliner } from "@/models/frontliner";
import { higherAuth } from "@/models/higherAuth";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
                role: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { email, password, role } = credentials;

                try {
                    await dbConnect();

                    let user;
                    if (role === "Admin") {
                        user = await User.findOne({ email });
                    } else if (role === "Frontliner") {
                        user = await Frontliner.findOne({ email });
                    } else {
                        user = await higherAuth.findOne({ email, role });
                    }

                    if (!user) {
                        throw new Error("User not found");
                    }

                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isMatch) {
                        throw new Error("Email or Password is not correct");
                    }

                    return { ...user.toObject(), role };
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
