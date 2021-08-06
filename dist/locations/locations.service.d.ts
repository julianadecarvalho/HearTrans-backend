import { Repository } from 'typeorm';
import { LocationsEntity } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationsService {
    private locationsRepository;
    constructor(locationsRepository: Repository<LocationsEntity>);
    create(data: CreateLocationDto): Promise<LocationsEntity>;
    update(id: number, data: Partial<CreateLocationDto>): Promise<LocationsEntity>;
    showAll(): Promise<LocationsEntity[]>;
    showOne(id: number): Promise<LocationsEntity>;
    remove(id: number): Promise<void>;
}
