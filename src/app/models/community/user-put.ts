import { City } from '../trips/city';
import { Poi } from '../community/poi';

export interface UserPut {
    id: number,
    firstname: string,
    lastname: string,
    login: string,
    email: string,
    gender: string,
    avatar: string,
    description: string,
    birthday: string,
    city: City,
    pois: Poi[]
}
