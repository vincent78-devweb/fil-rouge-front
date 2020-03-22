import { City } from '../trips/city';
import { Poi } from '../community/poi';

export interface User {
    id: number,
    firstname: string,
    lastname: string,
    pseudo: string, // Alias login in entity User
    email: string,
    avatar: string,
    description: string,
    birthday: string,
    city: City,
    poi: Poi[],
    gender: string, // Alias sex in entity User
    dateCreation: string,
    age: number
}
