import { LoginAuthDto } from "../../../dto/userDto/user.barrel";
import { User } from "src/entities/user.entity";

// Define the AuthInterface
export interface AuthInterface {
    // Declare the loginInterface method
    // It takes two parameters: email and pass, both of type Partial<LoginAuthDto>
    // Returns a Promise that resolves to an object containing user data and access token
    loginInterface(email: Partial<LoginAuthDto>, pass: Partial<LoginAuthDto>): Promise<{
        data: User
        access_token: string
    }>

    // There are two empty spaces here, possibly for future method declarations
}