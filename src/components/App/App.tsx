import React  from "react";
import { useAppSelector } from "../../hooks/redux";
import { Map } from "../Map/Map";
import { RequestsTable } from "../Table/RequestsTable";
import appClasses from './app.module.css'

export const App = () => {
    const {selectedRoute} = useAppSelector(state => state.requestsReducer)

    return (
        <div className={appClasses.container}>
            <RequestsTable />
            <Map />
        </div>
    )
}