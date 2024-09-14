import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private JwtServices:JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<{access_token:string}> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload={
      sub:user.userId,
      email:user.email
    }
    
    return {
      access_token:await this.JwtServices.signAsync(payload)
    }
  }
}





