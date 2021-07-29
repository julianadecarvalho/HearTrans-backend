import {IsInt, IsNumberString, IsString, IsPhoneNumber} from 'class-validator';

export class CreateProvider {
    @IsString()
    readonly name: string;

    @IsString({ each:true })
    readonly otherNames: Set<string>;

    @IsString({ each:true })
    readonly specialties: Set<string>;

    @IsString({ each:true })
    readonly languages: Set<string>;

    @IsString({ each:true })
    readonly locations: Set<string>;
}