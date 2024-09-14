export const jwtConfig = () => ({
    secret: process.env.JWT_SECRET || 'defaultSecret',
    signOptions: {
      expiresIn: '60s',
    },
  });