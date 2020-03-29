import { User } from '../community/user';
import {City} from '../zone/city';
import {Poi} from '../commons/poi';

export interface Trip {
    id: number,
    name: string,
    dateTrip: string,
    timeStart: string,
    timeEnd: string,
    nbPerson: number,
    description: string,
    promoteur: User,
    users: User[],
    city: City,
    poi: Poi,
    ageMin: number,
    ageMax: number
}

