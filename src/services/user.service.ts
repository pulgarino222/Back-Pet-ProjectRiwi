


import { Injectable } from '@nestjs/common';




export type User = any;

@Injectable()
export class usersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(users =>users.email===email);
  }
}
