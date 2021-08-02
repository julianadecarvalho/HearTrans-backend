import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvidersEntity } from './provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';


@Injectable()
export class ProvidersService {
    constructor(
        @InjectRepository(ProvidersEntity)
        private providersRepository: Repository<ProvidersEntity>,
    ) { }

    async create(data: CreateProviderDto): Promise<ProvidersEntity> {
        // we have to make sure to return an error when the data
        // doesn't conform to what we expect
        // (right now it will try to create it
        // say that it did and crash)

        this.providersRepository.create(data);
        const provider = await this.providersRepository.save(data);
        return provider;
    }

    update(id: number, data: Partial<CreateProviderDto>): Promise<ProvidersEntity> {
        this.providersRepository.update({ id }, data);
        return this.providersRepository.findOne({ id });
    }

    showAll(): Promise<ProvidersEntity[]> {
        return this.providersRepository.find();
    }

    showOne(id: number): Promise<ProvidersEntity> {
        return this.providersRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.providersRepository.delete(id);
    }
}