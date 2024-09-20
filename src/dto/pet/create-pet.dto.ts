import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID, IsObject } from 'class-validator';

export class CreatePetDto {
  
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsNotEmpty()
  @IsEnum(['macho', 'hembra'])
  readonly sex: 'macho' | 'hembra';

  @IsNotEmpty()
  readonly size: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @IsNotEmpty()
  @IsString()
  readonly time_at_the_shelter: string;

  @IsNotEmpty()
  @IsString()
  readonly health_history: string;

  @IsNotEmpty()
  @IsObject()
  health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  
  @IsString()
  @IsOptional()
  readonly personality?: string;

 
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  readonly userId: string;


 
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  readonly breedId: string;


 
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  readonly specieId: string;


  image: Express.Multer.File
}
