// Import necessary functions from @nestjs/testing for testing
import { Test, TestingModule } from '@nestjs/testing';
// Import the controller we're going to test
import { AuthController } from './auth.controller';

// Describe a set of tests for AuthController
describe('AuthController', () => {
  // Declare a variable to store the controller instance
  let controller: AuthController;

  // Before each test, set up the testing module
  beforeEach(async () => {
    // Create a testing module using TestingModule
    const module: TestingModule = await Test.createTestingModule({
      // Specify that AuthController is the controller we want to test
      controllers: [AuthController],
    }).compile();

    // Get an instance of the controller from the testing module
    controller = module.get<AuthController>(AuthController);
  });

  // Define an individual test
  it('should be defined', () => {
    // Verify that the controller is defined (not null or undefined)
    expect(controller).toBeDefined();
  });
});