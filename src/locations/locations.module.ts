import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationsEntity } from './location.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LocationsEntity])],
    providers: [LocationsService],
    controllers: [LocationsController],
})
export class LocationsModule { }
