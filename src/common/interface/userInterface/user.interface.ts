import { User } from "src/entities/user.entity";
import { CreateUserDto, GetUserByIdDto, UpdateUserDto, GetUserByEmailDto } from "../../../dto/userDto/user.barrel";

export interface UserInterface {
  newUserInterface(entity: CreateUserDto): Promise<User>;

  getAllUsersInterface(): Promise<User[]>;

  getByIdUsersInterface(id: GetUserByIdDto): Promise<User>;

  updateUsersInterface(newData: UpdateUserDto, id: GetUserByIdDto): Promise<User>;

  deleteUserByIdInterface(idToDelete: GetUserByIdDto): Promise<User>;

  findByEmail(email: GetUserByEmailDto): Promise<User>;
}

  