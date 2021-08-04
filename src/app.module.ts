import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { LocationsModule } from './locations/locations.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [TypeOrmModule.forRoot({ autoLoadEntities: true, }), ProvidersModule, LocationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
