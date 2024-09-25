// Export a function that returns the JWT configuration object
export const jwtConfig = () => ({
  // Set the secret key for JWT signing and verification
  // Use the JWT_SECRET environment variable if available, otherwise use 'defaultSecret'
  secret: process.env.JWT_SECRET || 'defaultSecret',
  
  // Options for signing the JWT
  signOptions: {
    // Set the expiration time for the JWT to 8 hours
    expiresIn: '8h',
  },
});