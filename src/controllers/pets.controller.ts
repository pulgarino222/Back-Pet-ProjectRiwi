import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException, UseGuards ,Query,BadRequestException,UseInterceptors,UploadedFile} from '@nestjs/common';
import { PetsService } from '../services/pets.service';
import { CreatePetDto, UpdatePetDto, FindBySize,FindBySpeciesDto} from '../dto/pet/pet.dto.barrel';
import { Pet } from 'src/entities/pet.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/auth-roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth() // Adds support for JWT authentication
@ApiTags('Pets') // Groups routes under "Pets" in Swagger
@Controller('pets')
// @UseGuards(RolesGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // Route to get all pets
  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({ status: 200, description: 'Pets retrieved successfully', type: [Pet] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllPets(): Promise<Pet[]> {
    try {
      return await this.petsService.getAllPetsInterface();
    } catch (error) {
      throw new InternalServerErrorException('Unable to retrieve pets');
    }
  }

  // Route to get a pet by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a pet by ID' })
  @ApiParam({ name: 'id', description: 'Pet ID', type: String })
  @ApiResponse({ status: 200, description: 'Pet retrieved successfully', type: Pet })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  async getPetById(@Param('id') id: string): Promise<Pet> {
    try {
      return await this.petsService.getByIdPetInterface({ id });
    } catch (error) {
      throw new NotFoundException('Pet not found');
    }
  }

  // Route to create a new pet
  @Post('create')
  @UseInterceptors(FileInterceptor('image')) // Interceptor para manejar la subida del archivo
  async createPet(
    @Body() createPetDto: CreatePetDto, // Datos del cuerpo de la petición
    @UploadedFile() file: Express.Multer.File // Imagen cargada
  ): Promise<Pet> {
    try {
      // Verificar que el archivo de imagen está presente
      if (!file) {
        throw new BadRequestException('Image file is required');
      }

      // Asignar el archivo de imagen al DTO
      createPetDto.image = file;

      // Llamar al servicio para crear la mascota y manejar la imagen
      return await this.petsService.newPetInterface(createPetDto);
    } catch (error) {
      console.error('Error creating pet:', error);
      throw new InternalServerErrorException('Unable to create the pet');
    }
  }

  // Route to update a pet by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a pet by ID' })
  @ApiParam({ name: 'id', description: 'Pet ID', type: String })
  @ApiBody({ type: UpdatePetDto })
  @ApiResponse({ status: 200, description: 'Pet updated successfully', type: Pet })
  @ApiResponse({ status: 500, description: 'Error updating the pet' })
  async updatePet(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Pet> {
    try {
      return await this.petsService.updatePetInterface(updatePetDto, { id });
    } catch (error) {
      throw new InternalServerErrorException('Unable to update the pet');
    }
  }

  // Route to delete a pet by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet by ID' })
  @ApiParam({ name: 'id', description: 'Pet ID', type: String })
  @ApiResponse({ status: 200, description: 'Pet deleted successfully' })
  @ApiResponse({ status: 500, description: 'Error deleting the pet' })
  async deletePet(@Param('id') id: string): Promise<void> {
    try {
      await this.petsService.deletePetByIdInterface({ id });
    } catch (error) {
      throw new InternalServerErrorException('Unable to delete the pet');
    }
  }

  // Route to find pets by species and estimated size
  @Get('find-by-species-size')
  async findBySpeciesAndEstimatedSize(
    @Query() specie: FindBySpeciesDto,
    @Query() size: FindBySize
  ): Promise<Pet[]> {
    try {
      // Validación básica
      if (!specie.specieId || !size.estimatedSize) {
        throw new BadRequestException('Species ID and estimated size are required');
      }

      return await this.petsService.findBySpeciesAndEstimatedSize(specie, size);
    } catch (error) {
      console.error('Error in findBySpeciesAndEstimatedSize:', error);
      throw new InternalServerErrorException('Error fetching pets by species and size');
    }
  }
}
