import { Repository } from 'typeorm';
import { ProvidersEntity } from './provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
export declare class ProvidersService {
    private providersRepository;
    constructor(providersRepository: Repository<ProvidersEntity>);
    create(data: CreateProviderDto): Promise<ProvidersEntity>;
    update(id: number, data: Partial<CreateProviderDto>): Promise<ProvidersEntity>;
    showAll(): Promise<ProvidersEntity[]>;
    showOne(id: number): Promise<ProvidersEntity>;
    remove(id: number): Promise<void>;
}
