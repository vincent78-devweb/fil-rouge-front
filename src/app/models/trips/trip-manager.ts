export interface TripManager {
  id: number,
  name: string,
  dateTrip: string,
  timeStart: string,
  timeEnd: string,
  nbPerson: number,
  description: string,
  promoteurId: number,
  cityId: number,
  poiId: number,
  ageMin: number,
  ageMax: number
}

