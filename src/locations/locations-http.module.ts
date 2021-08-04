import { Module } from '@nestjs/common';
import { LocationsModule } from './locations.module';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';

@Module({
    imports: [ProvidersModule],
    locations: [LocationsService],
    controllers: [LocationsController]
})
export class LocationHttpModule { }
