import React, {useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

import './routing.css'

interface Props {
    start: [number, number];
    end: [number, number];
}

const Route = ({start, end}: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return () => {};

    //@ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(end)],
      routeWhileDragging: false,
      draggableWaypoints: false,
      showAlternatives: false,
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

export default Route