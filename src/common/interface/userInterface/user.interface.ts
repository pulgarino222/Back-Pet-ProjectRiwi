// Import the User entity
import { User } from "src/entities/user.entity";
// Import various Data Transfer Objects (DTOs) for user operations
import { CreateUserDto, GetUserByIdDto, UpdateUserDto, GetUserByEmailDto } from "../../../dto/userDto/user.barrel";

// Define the UserInterface which outlines the contract for user-related operations
export interface UserInterface {
  // Method to create a new user
  newUserInterface(entity: CreateUserDto): Promise<User>;

  // Method to retrieve all users
  getAllUsersInterface(): Promise<User[]>;

  // Method to get a user by their ID
  getByIdUsersInterface(id: GetUserByIdDto): Promise<User>;

  // Method to update a user's information
  updateUsersInterface(newData: UpdateUserDto, id: GetUserByIdDto): Promise<User>;

  // Method to delete a user by their ID
  deleteUserByIdInterface(idToDelete: GetUserByIdDto): Promise<User>;

  // Method to find a user by their email address
  findByEmail(email: GetUserByEmailDto): Promise<User>;
}