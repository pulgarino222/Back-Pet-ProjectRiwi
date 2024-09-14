import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';




@Injectable()
export class UsersService {
    
    constructor (@Inject(User) private userRepository:Repository<User>){}
    createUser(user:CreateUserDto):Promise<User>{

        try {
            const newUser=this.userRepository.create(user)
            return this.userRepository.save(newUser)   
        } catch (error) {
            console.error(error)
        }
        

    }

}
