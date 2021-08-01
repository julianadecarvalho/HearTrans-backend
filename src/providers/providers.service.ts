import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvidersEntity } from './provider.entity';
import { ProvidersDTO } from './dto/provider.dto';

@Injectable()
export class ProvidersService {
    constructor(
        @InjectRepository(ProvidersEntity)
        private providersRepository: Repository<ProvidersEntity>,
    ) { }

    create(data: ProvidersDTO): Promise<ProvidersEntity> {
        const user = this.providersRepository.create(data);
        this.providersRepository.save(data);
        return this.providersRepository.findOne(user.id);
    }

    update(id: number, data: Partial<ProvidersDTO>): Promise<ProvidersEntity> {
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