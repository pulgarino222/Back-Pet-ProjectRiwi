import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{
    data: User;
    access_token: string;
  }> {
    const user = await this.usersService.findByEmail({ email });
    if (!user) {
      throw new HttpException('User not found', 404); // Use throw here
    }

    const isPasswordValid = await compare(pass, user.password); // true or false
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect credentials'); // Use throw here
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      data: user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
