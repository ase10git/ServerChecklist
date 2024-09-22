import { createContext, useContext } from "react";

const MapContext = createContext();

export function useMap() {
    return useContext(MapContext);
}

export default MapContext;