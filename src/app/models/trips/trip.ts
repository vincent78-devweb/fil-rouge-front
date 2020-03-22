import { User } from '../community/user';

export interface Trip {
    id: number,
    title: string,
    dateTrip: string,
    timeStart: string,
    timeEnd: string,
    nbRegistration: number, // Pas présent dans la table TRIP -> A ajouter dans le DTO
    nbPersons: number,
    description: string,
    promoteur: User,
    users : User[],
    city: string,
    pois: string,
    ageMin: number,
    ageMax: number
}
