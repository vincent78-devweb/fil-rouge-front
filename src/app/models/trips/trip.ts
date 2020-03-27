import { User } from '../community/user';
import {City} from '../zone/city';
import {Poi} from '../commons/poi';

export interface Trip {
    id: number,
    name: string,
    dateTrip: string,
    timeStart: string,
    timeEnd: string,
  //  nbRegistration: number, // Pas présent dans la table TRIP -> A ajouter dans le DTO
    nbPerson: number,
    description: string,
    promoteur: User,
    users: User[],
    city: City,
    pois: Poi,
    ageMin: number,
    ageMax: number
}
