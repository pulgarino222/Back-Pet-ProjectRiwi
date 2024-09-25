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

  // Method to authenticate a user and generate an access token
  async signIn(email: string, pass: string): Promise<{
    data: User;
    access_token: string;
  }> {
    // Find the user by email
    const user = await this.usersService.findByEmail({ email });
    if (!user) {
      // Throw an exception if the user is not found
      throw new HttpException('User not found', 404);
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await compare(pass, user.password);
    if (!isPasswordValid) {
      // Throw an exception if the password is incorrect
      throw new UnauthorizedException('Incorrect credentials');
    }

    // Fetch the full user details, including roles
    const fullUser = await this.usersService.getByIdUsersInterface({ id: user.id });

    // Create a payload for the JWT token
    const payload = {
      id: fullUser.id,
      email: fullUser.email,
      roles: fullUser.roles.map(role => ({
        id: role.id,
        name: role.name,
      })),
    };

    // Return the full user data and the generated access token
    return {
      data: fullUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

