import { City } from '../zone/city';
import { PoiElt } from '../commons/poi-elt';

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
    pois: PoiElt[]
}
