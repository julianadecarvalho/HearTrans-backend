import { Injectable, NotFoundException } from '@nestjs/common';
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
        data.reviews = [];
        data.locations = [];
        this.providersRepository.create(data);
        const provider = await this.providersRepository.save(data);
        return provider;
    }

    async update(id: number, data: Partial<CreateProviderDto>): Promise<ProvidersEntity> {
        var provider = await this.showOne(id)
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }
        //I guess I'll hard code this with ternaries
        for (const [key, value] of Object.entries(data)) {
            console.log(key, value);
            provider[key] = value;
            console.log(provider[key]);
        }
        console.log(provider);
        this.providersRepository.save(provider);
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