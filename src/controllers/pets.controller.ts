import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { PetsService } from '../services/pets.service';
import { CreatePetDto, UpdatePetDto, FindBySpeciesEstimatedSizeDto, GetByIdPetDto } from '../dto/pet/pet.dto.barrel';
import { Pet } from 'src/entities/pet.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/auth-roles.guard';

@ApiBearerAuth() // Adds support for JWT authentication
@ApiTags('Pets') // Groups routes under "Pets" in Swagger
@Controller('pets')
@UseGuards(RolesGuard)
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
  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiBody({ type: CreatePetDto })
  @ApiResponse({ status: 201, description: 'Pet created successfully', type: Pet })
  @ApiResponse({ status: 500, description: 'Error creating the pet' })
  async createPet(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    try {
      return await this.petsService.newPetInterface(createPetDto);
    } catch (error) {
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
  @Post('find')
  @ApiOperation({ summary: 'Find pets by species and estimated size' })
  @ApiBody({ type: FindBySpeciesEstimatedSizeDto })
  @ApiResponse({ status: 200, description: 'Pets found successfully', type: [Pet] })
  @ApiResponse({ status: 500, description: 'Error finding pets' })
  async findPetsBySpeciesAndSize(@Body() dto: FindBySpeciesEstimatedSizeDto): Promise<Pet[]> {
    try {
      return await this.petsService.findBySpeciesAndEstimatedSize(dto);
    } catch (error) {
      throw new InternalServerErrorException('Unable to find pets');
    }
  }
}
