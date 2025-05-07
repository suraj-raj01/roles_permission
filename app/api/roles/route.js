import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
    const { role } = await request.json();

    try {
        const newRole = await prisma.role.create({
            data: {
                role: role,
            },
        });
        console.log(newRolw);
        return new Response(JSON.stringify(newRole), { status: 201 });
    } catch (error) {
        console.error("Error creating role:", error);
        return new Response("Failed to create role", { status: 500 });
    }
}

export async function GET(request) {
    try {
        const roles = await prisma.role.findMany();
        return new Response(JSON.stringify(roles), { status: 200 });
    } catch (error) {
        console.error("Error fetching roles:", error);
        return new Response("Failed to fetch roles", { status: 500 });
    }
}