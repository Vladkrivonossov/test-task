import { configureStore, combineReducers } from "@reduxjs/toolkit"
import createSagaMiddleWare from 'redux-saga'
import requestsSaga from "../sagas/requestsSaga";
import requestsReducer from "./reducers/requestsReducer";

const sagaMw = createSagaMiddleWare()

const rootReducer = combineReducers({
    requestsReducer,
})

export const setupStore = () => {
    
    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMw]
    })
    
    sagaMw.run(requestsSaga)
    return store
};


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']