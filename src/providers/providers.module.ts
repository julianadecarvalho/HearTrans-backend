import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { ProvidersEntity } from './provider.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProvidersEntity])],
    providers: [ProvidersService],
    controllers: [ProvidersController],
})
export class ProvidersModule { }
