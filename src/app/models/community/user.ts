import { City } from '../zone/city';
import { PoiElt } from '../commons/poi-elt';

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
    pois: PoiElt[],
    gender: string,
    dateCreation: string,
    age: number
}
