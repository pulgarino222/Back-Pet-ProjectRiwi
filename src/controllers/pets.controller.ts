import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException, UseGuards, Query, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PetsService } from '../services/pets.service';
import { CreatePetDto, UpdatePetDto, FindBySize, FindBySpeciesDto } from '../dto/pet/pet.barrel';
import { Pet } from 'src/entities/pet.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/auth-roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('Pets')
@Controller('pets')

export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // GET /pets - Retrieve all pets
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

  // GET /pets/:id - Retrieve a pet by ID
  @UseGuards(JwtAuthGuard)
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

  // POST /pets/create - Create a new pet
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createPet(
    @Body() createPetDto: CreatePetDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Pet> {
    try {
      if (!file) {
        throw new BadRequestException('Image file is required');
      }

      createPetDto.image = file;

      return await this.petsService.newPetInterface(createPetDto);
    } catch (error) {
      console.error('Error creating pet:', error);
      throw new InternalServerErrorException('Unable to create the pet');
    }
  }

  // PUT /pets/:id - Update a pet by ID
  @UseGuards(JwtAuthGuard)
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

  // DELETE /pets/:id - Delete a pet by ID
  @UseGuards(JwtAuthGuard)
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

  // GET /pets/find-by-species-size - Find pets by species and estimated size
  @Get('find-by-species-size')
  async findBySpeciesAndEstimatedSize(
    @Query() specie: FindBySpeciesDto,
    @Query() size: FindBySize
  ): Promise<Pet[]> {
    try {
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
