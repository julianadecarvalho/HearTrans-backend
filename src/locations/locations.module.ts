import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationsEntity } from './location.entity';
import { ProvidersModule } from 'src/providers/providers.module';
@Module({
    imports: [TypeOrmModule.forFeature([LocationsEntity]), forwardRef(() => ProvidersModule)],
    providers: [LocationsService],
    controllers: [LocationsController],
    exports: [LocationsService]
})
export class LocationsModule { }
