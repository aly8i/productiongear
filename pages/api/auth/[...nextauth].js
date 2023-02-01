import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
        }),
        AppleProvider({
            clientId: process.env.NEXT_PUBLIC_APPLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_APPLE_SECRET
        }),
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.NEXT_PUBLIC_LINKEDIN_ID,
            clientSecret: process.env.LINKEDIN_SECRET
        }),
    ],
    secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
    url:"http://localhost:3000"
})