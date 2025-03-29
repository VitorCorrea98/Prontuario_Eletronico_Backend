import type { Request } from "express";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type {
	ServiceErrorResponse,
	ServiceResponse,
	ServiceSuccessResponse,
} from "../../../shared/HTTP/ServiceReponse";
import { hashPassword } from "../../../shared/Security/hash";
import type { User } from "../Entities/User_Entity";
import type { IUserCreateRepository } from "../Repositories/User_Repository";

export const createUser =
	(userRepository: IUserCreateRepository<User>) =>
	async (request: Request): Promise<ServiceResponse> => {
		try {
			const user = request.body;
			// 🔐 Criptografa a senha
			const hashedPassword = await hashPassword(user.password);

			// 📝 Cria o usuário no banco
			const createdUser = await userRepository.create({
				...user,
				password: hashedPassword,
			});

			// 📢 Publica evento de criação
			await publishMessage("user.created", {
				name: createdUser.name,
				email: createdUser.email,
				role: createdUser.role,
			});

			// ✅ Retorna sucesso
			const response: ServiceSuccessResponse = {
				status: "CREATED",
				message: "Usuário criado com sucesso.",
			};

			return response;
		} catch (error) {
			const response: ServiceErrorResponse = {
				status: "BAD",
				message: "Erro ao criar usuário.",
				error: (error as Error).message,
			};

			return response;
		}
	};
