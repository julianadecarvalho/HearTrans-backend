import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { ProvidersEntity } from './provider.entity';
import { LocationsModule } from '../locations/locations.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProvidersEntity]), forwardRef(() => LocationsModule)],
    providers: [ProvidersService],
    controllers: [ProvidersController],
    exports: [ProvidersService]
})
export class ProvidersModule { }
