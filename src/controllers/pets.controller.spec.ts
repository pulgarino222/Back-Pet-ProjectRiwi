// Import necessary testing utilities from NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import the controller we're going to test
import { PetsController } from './pets.controller';

// Describe block for PetsController tests
describe('PetsController', () => {
  // Declare a variable to hold the controller instance
  let controller: PetsController;

  // Before each test, set up a testing module
  beforeEach(async () => {
    // Create a testing module with PetsController
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
    }).compile();

    // Get an instance of PetsController from the testing module
    controller = module.get<PetsController>(PetsController);
  });

  // Test to check if the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
