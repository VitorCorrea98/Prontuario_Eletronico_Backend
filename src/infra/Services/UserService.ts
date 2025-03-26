import { createUser } from "../../core/User/UseCases/User_CreateUser";
import { PrismaUserRepository } from "../Repositories/PrismaUserRepository";

export const createUserService = createUser(PrismaUserRepository);
