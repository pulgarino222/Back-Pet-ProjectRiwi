// Import types from the 'cloudinary' package
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

// Define a custom type 'CloudinaryResponse' that can be either
// a successful upload response (UploadApiResponse) or
// an error response (UploadApiErrorResponse) from Cloudinary
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
