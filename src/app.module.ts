import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersEntity } from './providers/provider.entity'
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [TypeOrmModule.forRoot({ autoLoadEntities: true, }), ProvidersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
