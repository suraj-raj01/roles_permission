import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
    const { username, email, password } = await request.json();
    console.log(username,email,password)
    try {
        const newUser = await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: password,
            },
        });     
        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Failed to create user", { status: 500 });
    }
}