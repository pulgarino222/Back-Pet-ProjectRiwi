// Import necessary testing utilities from NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import the service we're going to test
import { PetsService } from './pets.service';

// Describe block for PetsService tests
describe('PetsService', () => {
  // Declare a variable to hold the instance of PetsService
  let service: PetsService;

  // Before each test, set up a testing module
  beforeEach(async () => {
    // Create a testing module with PetsService as a provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsService],
    }).compile();

    // Get an instance of PetsService from the testing module
    service = module.get<PetsService>(PetsService);
  });

  // Test case to check if the service is defined
  it('should be defined', () => {
    // Assert that the service instance is defined
    expect(service).toBeDefined();
  });
});