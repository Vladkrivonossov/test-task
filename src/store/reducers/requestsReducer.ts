import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { coords, IRequest } from "../../types"

interface RequestsState {
    transportationRequests: {
        requests: IRequest[];
    },
    isLoading: boolean;
    selectedRoute: IRequest | null
}

const initialState: RequestsState = {
    transportationRequests: {
        requests: [
            {reqNumber: 1, from: {lat: 59.84660399, lng: 30.29496392}, to: {lat: 59.82934196, lng: 30.42423701}, route: []},
            {reqNumber: 2, from: {lat: 59.82934196, lng: 30.42423701}, to: {lat: 59.82761295, lng:30.41705607}, route: []},
            {reqNumber: 3, from: {lat: 59.83567701, lng: 30.38064206}, to: {lat: 59.84660399, lng:30.29496392}, route: []},
            {reqNumber: 4, from: {lat: 59.84660399, lng: 30.29496392}, to: {lat: 59.82761295, lng: 30.41705607}, route: []},
            {reqNumber: 5, from: {lat: 59.83567701, lng: 30.38064206}, to: {lat: 59.84660399, lng: 30.29496392}, route: []},
        ]
    }, 
    isLoading: false,
    selectedRoute: null
}

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        getFetchRequests: (state) => {
            state.isLoading = true
        },
        fetchRequests: (state, action: PayloadAction<{route: coords[], reqNum: number}[]>) => {
            const {requests} = state.transportationRequests

            requests.map(req => {
                action.payload.forEach(route => {
                    if (req.reqNumber === route.reqNum) {
                        return req.route = route.route
                    }
                })
            })
            state.isLoading = false
        },
        setSelectedRoute: (state, action: PayloadAction<IRequest>) => {
            state.selectedRoute = action.payload
        }
    }
})

export const {fetchRequests, getFetchRequests, setSelectedRoute} = requestsSlice.actions
export default requestsSlice.reducer