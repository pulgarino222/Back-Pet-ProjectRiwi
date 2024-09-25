// Import necessary testing modules from NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import the service we're going to test
import { UsersService } from './users.service';

// Describe block for UsersService tests
describe('UsersService', () => {
  // Declare a variable to hold the instance of UsersService
  let service: UsersService;

  // Before each test, set up a testing module
  beforeEach(async () => {
    // Create a testing module with UsersService as a provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    // Get an instance of UsersService from the testing module
    service = module.get<UsersService>(UsersService);
  });

  // Test case to check if the service is defined
  it('should be defined', () => {
    // Assert that the service instance is defined
    expect(service).toBeDefined();
  });
});
