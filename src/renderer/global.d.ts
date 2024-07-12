// import { ApiSurface } from './os/api';
// export type ApiSurface = typeof api;
import { api } from '../main/preload';

type ApiSurface = typeof api;

declare global {
  interface Window {
    electron: ApiSurface;
  }

  interface UserType {
    id: string;
    name: string;
    password: string;
    location: Location;
    lockapp: boolean;
    createdAt: Date;
    default: boolean;
  }

  type UserLocation = (UserType & { location: Location}) | null

  interface Location {
    id: string;
    name: string;
    tel: string;
  }

  interface Colis {
    id: number;
    name: string | null;
    quantity: number;
    paid?: boolean;
    fees: number;
    fromLocationId: string;
    toLocationId: string;
    from?: Location;
    to?: Location;
    expName: string | null;
    expPhone: string | null;
    recName: string | null;
    recPhone: string | null;
    date: Date;
    car: string;
  }
}
