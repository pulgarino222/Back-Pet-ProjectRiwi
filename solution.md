Por favor crear los dto y las interface 

    # src/dto/pet#
-   *los archivos dto son:*
    -   create-pet.dto.ts
    -   fin-by-species-estimatedSize.dto.ts
    -   get-by-id-pet.dto.ts
    -   update-pet.dto.ts
    -   pet.dto.barrel.ts (archivo barril)
    
    # src/common/interface #
-   *el archivo interface es:*
    -   petInterface


## las entidades son 4 ##

    #src/entities#
-   *pet.entity.ts*
        
```ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { User } from './user.entity';
import { PetBreed } from './petBreed.entity';
import { PetSpecies } from './petSpecies.entity';
import { PetMedia } from './petMedia.entity';

@Entity()
export class Pet {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
name: string;

@ManyToOne(() => PetBreed, (breed) => breed.pets)
breed: PetBreed;

@ManyToOne(() => PetSpecies, (species) => species.pets)
specie: PetSpecies;

@Column()
age: number;

@Column()
sex: 'macho' | 'hembra';

@Column('json', { nullable: true })
size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
};

@Column()
weight: number;

@Column()
time_at_the_shelter: string;

@Column()
health_history: string;

@Column('json')
health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
};

@Column({ nullable: true })
personality?: string;

@ManyToOne(() => User, (user) => user.pets_id)
user: User;

@OneToMany(() => PetMedia, (media) => media.pet)
media: PetMedia[];

}

```

- *petBreed.entity.ts* 

```ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class PetBreed {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
name: string;

@OneToMany(() => Pet, (pet) => pet.breed)
pets: Pet[];
}
```
- *petSpecies.entity.ts* 

```ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class PetSpecies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.specie)
  pets: Pet[];
}
```

- *petMedia.entity.ts* 

```ts
  
  @Entity('pet_media')
  export class PetMedia {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    media_type: string;
  
    @Column()
    url: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => Pet, (pet) => pet.media)
    pet: Pet;
  }
```  
        
    "Quiero que la clase de servicio implemente una interfaz."
    "Por favor, incluye una interfaz para el servicio."
    "Necesito que la clase PetsService siga una interfaz específica."

