import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export async function POST(req:Request) {
        try{
            const{name, email, password, username} = await req.json()
            const hashPassword = bcrypt.hashSync(password, 10)
            const newUser = await prisma.user.create({
                data:{
                    name :name,
                    email :email,
                    password: hashPassword,
                    username: username
                }
            })
            return Response.json({
                message: 'created user',
                data:{
                    newUser
                }
            })
        }
        catch(error){
            console.error('SIGNUP ERROR:', error)
            return Response.json({
                error
            },{status: 500})
        }
    
}