import { Trip} from './trip';

export interface TripsListPager {
  content: Trip[],
  empty: true,
  first: true,
  last: true,
  number: number,
  numberOfElements: number,
  pageable: {
    page: number,
    size: number,
    sort: string
  },
  size: number,
  sort: {
    empty: true,
    sorted: true,
    unsorted: true
  },
  totalElements: number,
  totalPages: number
}
