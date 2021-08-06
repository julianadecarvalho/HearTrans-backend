import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationsEntity } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';


@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationsEntity)
        private locationsRepository: Repository<LocationsEntity>
    ) { }

    async create(data: CreateLocationDto): Promise<LocationsEntity> {
        this.locationsRepository.create(data);
        const location = await this.locationsRepository.save(data);
        return location;
    }

    update(id: number, data: Partial<CreateLocationDto>): Promise<LocationsEntity> {
        this.locationsRepository.update({ id }, data);
        return this.locationsRepository.findOne({ id });
    }

    showAll(): Promise<LocationsEntity[]> {
        return this.locationsRepository.find();
    }

    showOne(id: number): Promise<LocationsEntity> {
        return this.locationsRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.locationsRepository.delete(id);
    }
}