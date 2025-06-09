import NextAuth from "next-auth";
import CredentailProvider from 'next-auth/providers/credentials';
import userModel from "./utils/models/User";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentailProvider({
            name:'credentials',

            async authorize(credentials){
                const user=await userModel.findOne({mail:credentials?.mail});
                if(!user){
                    return null;
                }
                if(credentials?.password!=user.password){
                    return null;
                }
                return{name:user.name,mail:user.mail,role:user.role};
            }
            
        })
    ],
    secret:process.env.SECRET_KEY,
    callbacks:{
        async jwt({token,user}){
            if(user)
            {
                token.userId=user.userId,
                token.username=user.name,
                token.mail=user.mail,
                token.role=user.role
            }
        },
        async session({session,token}){
            session.userId=token.userId,
            session.username=token.username,
            session.mail=token.mail,
            session.role=token.role
            return session
        }
        
    }

    
  })