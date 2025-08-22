import type { Request } from "express";
import type { ServiceResponse } from "ts-express-generic";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type { AuthTokenPayload } from "../../../shared/Security/authToken";
import type { User } from "../../Entities/User_Entity";
import type { IUserDeleteRepository } from "../../Repositories/User_Repository";

export type UserDeleteInput = {
  body: {
    email: string;
  };
  params: {
    id: string;
  };
  locals: {
    decoded: User;
  };
};

export type UserDeleteRequest = Request & {
  decoded?: AuthTokenPayload;
};

export const userDelete =
  (userRepository: IUserDeleteRepository<User>) =>
  async (input: UserDeleteInput): Promise<ServiceResponse> => {
    try {
      const { body, params } = input;

      await userRepository.delete({
        email: body.email,
        id: params.id as unknown as number,
      });

      await publishMessage("user.deleted", {
        message: `User id: ${params.id} and email: ${body.email} was deleted successfuly`,
      });

      return {
        status: "OK",
        message: "User deleted",
      };
    } catch (_error) {
      return {
        status: "BAD_REQUEST",
        error: "Error when trying to delete user",
        message: "Error when trying to delete user",
      };
    }
  };
