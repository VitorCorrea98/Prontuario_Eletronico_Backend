import type { GetDefaultEntity } from '../../types/entity'
import type { IUserDeleteDTO } from '../DTOs/User/UserDTODelete'

export type IUserCreateRepository<T> = {
  create(userLoginForm: GetDefaultEntity<T>): Promise<T>
}

export type IUserReadRepository<T> = {
  findByEmail(email: string): Promise<T | null>
}

export type IUserDeleteRepository<T> = {
  delete(userToDelete: IUserDeleteDTO): Promise<T>
}

export type IUserRepository<T> = IUserCreateRepository<T> &
  IUserReadRepository<T> &
  IUserDeleteRepository<T>
