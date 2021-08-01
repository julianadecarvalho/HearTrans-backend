import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
} from '@nestjs/common';

import { ProvidersService } from './providers.service';
import { ProvidersDTO } from './dto/provider.dto';

@Controller('providers')
export class ProvidersController {
    constructor(private providersService: ProvidersService) { }

    @Get()
    async showAllProviders() {
        const providers = await this.providersService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Providers fetched successfully',
            providers
        };
    }

    @Post()
    async createProviders(@Body() data: ProvidersDTO) {
        const provider = await this.providersService.create(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider created successfully',
            provider
        };
    }

    @Get(':id')
    async readProvider(@Param('id') id: number) {
        const data = await this.providersService.showOne(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider fetched successfully',
            data,
        };
    }

    @Patch(':id')
    async uppdateProvider(@Param('id') id: number, @Body() data: Partial<ProvidersDTO>) {
        await this.providersService.update(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider updated successfully',
        };
    }

    @Delete(':id')
    async deleteProvider(@Param('id') id: number) {
        await this.providersService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider deleted successfully',
        };
    }
}