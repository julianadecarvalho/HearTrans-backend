import { Repository } from 'typeorm';
import { ProvidersEntity } from './provider.entity';
import { ProvidersDTO } from './dto/provider.dto';
export declare class ProvidersService {
    private providersRepository;
    constructor(providersRepository: Repository<ProvidersEntity>);
    create(data: ProvidersDTO): Promise<ProvidersEntity>;
    update(id: number, data: Partial<ProvidersDTO>): Promise<ProvidersEntity>;
    showAll(): Promise<ProvidersEntity[]>;
    showOne(id: number): Promise<ProvidersEntity>;
    remove(id: number): Promise<void>;
}
