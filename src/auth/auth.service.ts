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
    const user = await this.usersService.findByEmail({ email }); // Asegúrate de que 'email' esté en el objeto
    if (!user) {
        throw new HttpException('User not found', 404);
    }

    const isPasswordValid = await compare(pass, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Incorrect credentials');
    }

    const fullUser = await this.usersService.getByIdUsersInterface({ id: user.id });

    const payload = {
        id: fullUser.id,
        email: fullUser.email,
        roles: fullUser.roles.map(role => ({
            id: role.id,
            name: role.name,
        })), 
    };

    return {
        data: fullUser,
        access_token: await this.jwtService.signAsync(payload),
    };
}

}

