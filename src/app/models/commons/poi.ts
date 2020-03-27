import {User} from '../community/user';
import {Trip} from '../trips/trip';

export interface Poi {
    id: number,
    name: string,
    users: User[],
    trips: Trip[]
}
