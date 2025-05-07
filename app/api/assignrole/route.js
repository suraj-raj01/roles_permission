import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(request) {
    try {
        const roles = await prisma.user.findMany();
        return new Response(JSON.stringify(roles), { status: 200 });
    } catch (error) {
        console.error("Error fetching roles:", error);
        return new Response("Failed to fetch roles", { status: 500 });
    }
}


export async function POST(request) {
    const { userId, roleId} = await request.json();
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { roleId: roleId },
        });
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error assigning role:", error);
        return new Response("Failed to assign role", { status: 500 });
    }
}