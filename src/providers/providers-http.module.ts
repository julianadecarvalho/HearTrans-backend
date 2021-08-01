import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers.module';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';

@Module({
    imports: [ProvidersModule],
    providers: [ProvidersService],
    controllers: [ProvidersController]
})
export class ProviderHttpModule { }
