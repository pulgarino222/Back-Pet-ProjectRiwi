import { Controller, Get, Redirect } from '@nestjs/common'; // Make sure to include Redirect

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello, welcome to my API!';
  }

  // Adding the redirect
  @Get('/') // Handles the root route
  @Redirect('/api', 302) // Redirect automatically to /api
  redirectToApi() {
    // This method can be left empty
  }
}
