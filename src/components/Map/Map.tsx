import React from 'react';
import { MapContainer, TileLayer, Polyline, useMap  } from 'react-leaflet'

import appClasses from './map.module.css'
import "leaflet/dist/leaflet.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFetchRequests } from "../../store/reducers/requestsReducer";
import { coords, RoutePoints } from '../../types';


export const Map = () => {
  const {selectedRoute} = useAppSelector(state => state.requestsReducer)
  const dispatch = useAppDispatch()
  

  React.useEffect(() => {
    dispatch(getFetchRequests())
  }, [dispatch])

  const getBounds = (): coords[] => {
    if (!selectedRoute) {
      return [
        [59.983762, 30.311365],
        [59.983762, 30.311365]
      ]
    }

    const lat: number[] = []
    const lng: number[] = []

    selectedRoute?.route.map(item => {
      lat.push(item[0])
      lng.push(item[1])
    })

    return [
      [Math.max(...lat), Math.max(...lng)],
      [Math.min(...lat), Math.min(...lng)]
    ]
  }

  const bounds = getBounds()

  const Locate = () => {
    const map = useMap()
    if (selectedRoute) {
      map.fitBounds(bounds)
    }
    
    return <div></div>
  }
  
  return (
    <MapContainer  className={appClasses['leaflet-container']} center={[59.983762, 30.311365]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={selectedRoute?.route ? selectedRoute.route : []} />
      <Locate />
    </MapContainer>
  );
}