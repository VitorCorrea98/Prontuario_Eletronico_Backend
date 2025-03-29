import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { hashPassword } from "../src/shared/Security/hash";

const prisma = new PrismaClient();

async function main() {
	// Hash password
	const adminPasswordHash = await hashPassword("admin1234");
	const nursePasswordHash = await hashPassword("nurse1234");

	// Create Admin User
	const adminUser = await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			name: "Admin",
			email: "admin@example.com",
			password: adminPasswordHash,
			role: "ADMIN",
		},
	});

	// Create Nurse User
	const nurseUser = await prisma.user.upsert({
		where: { email: "nurse@example.com" },
		update: {},
		create: {
			name: "Nurse Julia",
			email: "nurse@example.com",
			password: nursePasswordHash,
			role: "NURSE",
		},
	});

	console.log("✅ Seed completed:", { adminUser, nurseUser });
}

main()
	.catch((error) => {
		console.error("❌ Seed failed:", error);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
