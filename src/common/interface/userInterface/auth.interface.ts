import { LoginAuthDto } from "../../../dto/userDto/user.dto.barrel";
import { User } from "src/entities/user.entity";

export interface AuthInterface{

    loginInterface(email:Partial<LoginAuthDto>, pass:Partial<LoginAuthDto>):Promise<{
        data:User
        access_token: string
      }>

    

    
}