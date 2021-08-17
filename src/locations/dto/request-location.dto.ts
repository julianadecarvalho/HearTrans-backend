import { IsLatitude, IsLongitude } from 'class-validator';
export class RequestBodyLocationWithin {
    lat?: number;
    lon?: number;
    text?: string;
    withinMiles?: number;
}