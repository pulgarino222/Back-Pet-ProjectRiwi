import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from '../../config/cloudinary.provaider';

// This decorator defines a NestJS module
@Module({
  // No imports are specified in this module
 
  // Providers are services that can be injected into other classes
  providers: [CloudinaryService, CloudinaryProvider],
  
  // Exports make these providers available for use in other modules
  exports: [CloudinaryService, CloudinaryProvider],
})
// This class represents the Cloudinary module
export class CloudinaryModule {}
