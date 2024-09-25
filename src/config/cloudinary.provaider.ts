// Import the Cloudinary v2 library and alias it as 'cloudinary'
import { v2 as cloudinary } from 'cloudinary';

// Export a Cloudinary provider configuration object
export const CloudinaryProvider = {
  // Specify the injection token for the provider
  provide: 'CLOUDINARY',
  
  // Define a factory function to configure Cloudinary
  useFactory: () => {
    // Return the Cloudinary configuration
    return cloudinary.config({
      // Set the Cloudinary cloud name from environment variable
      cloud_name: process.env.CLOUDINARY_NAME,
      // Set the Cloudinary API key from environment variable
      api_key: process.env.CLOUDINARY_API_KEY,
      // Set the Cloudinary API secret from environment variable
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};