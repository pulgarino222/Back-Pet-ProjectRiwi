import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/userDto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/auth-roles.guard';

@ApiBearerAuth() // Adds support for JWT authentication
@ApiTags('Users') // Groups routes under "Users" in Swagger 
@Controller('users')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Route to get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully', type: [User] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersService.getAllUsersInterface();
    } catch (error) {
      throw new InternalServerErrorException('Unable to retrieve users');
    }
  }

  // Route to get a user by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User retrieved successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.getByIdUsersInterface({ id });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  // Route to update a user by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 500, description: 'Error updating the user' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.updateUsersInterface(updateUserDto, { id });
    } catch (error) {
      throw new InternalServerErrorException('Unable to update the user');
    }
  }

  // Route to delete a user by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: User })
  @ApiResponse({ status: 500, description: 'Error deleting the user' })
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.deleteUserByIdInterface({ id });
    } catch (error) {
      throw new InternalServerErrorException('Unable to delete the user');
    }
  }
}

