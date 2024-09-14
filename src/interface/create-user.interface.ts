import { User } from "src/entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

export interface CreateUser {
  newUserInterface(entity: CreateUserDto): Promise <User>
  }
  