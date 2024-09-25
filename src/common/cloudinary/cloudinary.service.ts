import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier'; 

@Injectable()
export class CloudinaryService {
  // Method to upload a file to Cloudinary
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    // Check if the file and its buffer exist
    if (!file || !file.buffer) {
      throw new BadRequestException('Invalid file or file buffer missing.');
    }

    // Return a Promise that resolves with the Cloudinary response
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      // Create an upload stream to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      try {
        // Create a readable stream from the file buffer
        const readStream = streamifier.createReadStream(file.buffer);
        // Pipe the readable stream to the upload stream
        readStream.pipe(uploadStream);
      } catch (error) {
        reject(error);
      }
    });
  }
}
