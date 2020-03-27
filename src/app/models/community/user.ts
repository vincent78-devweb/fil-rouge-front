import { City } from '../zone/city';
import { Poi } from '../commons/poi';

export interface User {
    id: number,
    firstname: string,
    lastname: string,
    login: string, // Alias login in entity User
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
