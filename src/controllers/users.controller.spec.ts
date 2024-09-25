// Import necessary testing modules from NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import the UsersController that we're going to test
import { UsersController } from './users.controller';

// Describe block for UsersController tests
describe('UsersController', () => {
  // Declare a variable to hold the instance of UsersController
  let controller: UsersController;

  // beforeEach block to set up the testing module before each test
  beforeEach(async () => {
    // Create a testing module using NestJS TestingModule
    const module: TestingModule = await Test.createTestingModule({
      // Declare UsersController in the controllers array
      controllers: [UsersController],
    }).compile();

    // Get an instance of UsersController from the testing module
    controller = module.get<UsersController>(UsersController);
  });

  // Test case to check if the controller is defined
  it('should be defined', () => {
    // Assert that the controller instance is defined
    expect(controller).toBeDefined();
  });
});
