import { User } from "src/entities/user.entity";
import { CreateUserDto,GetUserByIdDto, UpdateUserDto } from "../dto/dto.barrel";




export interface UserInterface {
  newUserInterface(entity: CreateUserDto): Promise <User>

  getAllUsersInterface():Promise<User>

  getByIdUsers(id:GetUserByIdDto):Promise<User>

  updateUsersDto(newData:UpdateUserDto):Promise<User>



  }

  