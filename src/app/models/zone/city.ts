import { Department } from './department';

export interface City {
    id: number,
    name: string,
    postalCode: string,
    latitude: number,
    longitude: number,
    department: Department
}
