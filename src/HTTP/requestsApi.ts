import axios from 'axios'
import {decode} from '@googlemaps/polyline-codec'
import { coords, IRequest } from '../types'

export const fetchData = async (requests: IRequest[]): Promise<{route: coords[], reqNum: number}[]> => {
    const result = await Promise.all(
        requests.map(async (req) => {
            const lngFrom = req.from.lng
            const latFrom = req.from.lat
            const lngTo = req.to.lng
            const latTo = req.to.lat
    
            const {data} = await axios.get(`http://router.project-osrm.org/route/v1/driving/${lngFrom},${latFrom};${lngTo},${latTo}?steps=true`)
    
            return {route: [...decode(data.routes[0].geometry)], reqNum: req.reqNumber}
        })
    )
    return result
}    