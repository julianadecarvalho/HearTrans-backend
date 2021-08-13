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

        provider.fullName = data.fullName ? data.fullName : provider.fullName;
        provider.otherNames = data.otherNames ? data.otherNames : provider.otherNames;
        provider.pronouns = data.pronouns ? data.pronouns : provider.pronouns
        provider.titles = data.titles ? data.titles : provider.titles;
        provider.specialties = data.specialties ? data.specialties : provider.specialties;
        provider.languages = data.languages ? data.languages : provider.languages;
        provider.services = data.services ? data.services : provider.services;
        provider.remoteVisits = data.remoteVisits ? data.remoteVisits : provider.remoteVisits;
        provider.slidingScalePay = data.slidingScalePay ? data.slidingScalePay : provider.slidingScalePay;
        provider.locations = data.locations ? data.locations : provider.locations;
        provider.reviews = data.reviews ? data.reviews : provider.reviews;

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