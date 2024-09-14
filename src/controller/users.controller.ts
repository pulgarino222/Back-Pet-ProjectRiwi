import { UsersService } from '../services/users.service';
import { Request,Response,Body, Controller, Post, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { promises } from 'dns';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersService) private userService:UsersService){}


    @HttpCode(HttpStatus.OK)
    @Post()
    newUserController(@Body() create:CreateUserDto){
        const newUser=this.userService.createUser(create)

    }



}
