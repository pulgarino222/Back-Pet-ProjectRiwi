// Import necessary testing modules from NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import the AuthService that we're going to test
import { AuthService } from './auth.service';

// Describe block for AuthService tests
describe('AuthService', () => {
  // Declare a variable to hold the instance of AuthService
  let service: AuthService;

  // beforeEach block to set up the testing module before each test
  beforeEach(async () => {
    // Create a testing module with AuthService as a provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    // Get an instance of AuthService from the testing module
    service = module.get<AuthService>(AuthService);
  });

  // Test case to check if AuthService is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});