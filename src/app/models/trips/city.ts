import { Department } from '../trips/department';

export interface City {
    id: number,
    name: number,
    postalCode: string,
    latitude: number,
    longitude: number,
    department: Department
}
