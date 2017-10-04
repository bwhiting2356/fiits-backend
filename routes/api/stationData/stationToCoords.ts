import { StationData } from "./stationData";
import { Coords } from "../../../shared/coords";

export const stationToCoords = (station: StationData): Coords => {
    return { lat: station.lat, lng: station.lng }
}
