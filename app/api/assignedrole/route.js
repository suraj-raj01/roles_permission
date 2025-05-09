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