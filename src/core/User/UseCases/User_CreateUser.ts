import type {
	ServiceErrorResponse,
	ServiceResponse,
	ServiceSuccessResponse,
} from "ts-express-generic";
import { publishMessage } from "../../../infra/Messaging/publisher";
import { hashPassword } from "../../../shared/Security/hash";
import type { User } from "../Entities/User_Entity";
import type { IUserCreateRepository } from "../Repositories/User_Repository";

export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;

type TCreateUserInput = {
	body: CreateUserInput;
};

export const createUser =
	(userRepository: IUserCreateRepository<User>) =>
	async (request: TCreateUserInput): Promise<ServiceResponse> => {
		try {
			const { body } = request;
			// 🔐 Criptografa a senha
			const hashedPassword = await hashPassword(body.password);

			// 📝 Cria o usuário no banco
			const createdUser = await userRepository.create({
				...body,
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
				status: "BAD_REQUEST",
				message: "Erro ao criar usuário.",
				error: (error as Error).message,
			};

			return response;
		}
	};
