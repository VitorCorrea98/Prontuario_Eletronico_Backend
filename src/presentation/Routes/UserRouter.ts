import { Router } from "express";
import { genericController } from "ts-express-generic";
import type { IUserLoginDTO } from "../../core/DTOs/User";
import type { User } from "../../core/Entities/User_Entity";
import type { CreateUserInput } from "../../core/UseCases/User/User_CreateUser";
import type {} from "../../core/UseCases/User/User_Delete";
import type {} from "../../core/UseCases/User/User_Login";
import { PrismaUserRepository } from "../../infra/Repositories/PrismaUserRepository";
import { userService } from "../../infra/Services/UserService";
import { verifyJWT } from "../../shared/Security/authToken";
import {
  validateRequestObject,
  validateTokenRole,
  validateUserExists,
} from "../Controllers/User";

export const userRouter = Router();
const UserService = userService(PrismaUserRepository);

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5 // Limit each IP to 5 requests per window
// });

userRouter.post(
  "/login",
  genericController({
    service: UserService.login,
    requestKeys: ["body", "locals"],
    middlewares: [
      validateRequestObject<IUserLoginDTO>(["email", "password"]),
      validateUserExists(PrismaUserRepository),
    ],
  }),
);

userRouter.post(
  "/create",
  genericController({
    service: UserService.create,
    requestKeys: ["body"],
    middlewares: [
      validateTokenRole("ADMIN"),
      validateRequestObject<CreateUserInput>([
        "email",
        "name",
        "password",
        "role",
      ]),
    ],
  }),
);

userRouter.delete(
  "/:id/delete",
  genericController({
    service: UserService.delete,
    requestKeys: ["body", "params"],
    middlewares: [
      validateRequestObject<Pick<User, "email">>(["email"]),
      verifyJWT,
      validateTokenRole("ADMIN"),
    ],
  }),
);
