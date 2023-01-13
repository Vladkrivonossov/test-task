import { LatLngTuple } from "leaflet";

export type coords = LatLngTuple

export interface RoutePoints{
    lat: number;
    lng: number;
}

export interface IRequest {
    reqNumber: number;
    from: RoutePoints;
    to: RoutePoints;
    route: coords[]
}