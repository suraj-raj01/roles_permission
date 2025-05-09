import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({
        where: {
        email: email,
        },
        include: {
        role: true,
        },
    });
    console.log(user);
    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        });
    }
    if (user.password !== password) {
        return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
        });
    }
    return new Response(JSON.stringify({ message: "Login successful",user}), {
        status: 200,
    });
}