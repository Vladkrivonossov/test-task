import { all, call, put, takeEvery } from 'redux-saga/effects'
import { fetchData } from '../HTTP/requestsApi'
import { fetchRequests } from '../store/reducers/requestsReducer'
import {store} from '../index'
import { coords } from '../types'


function* requestsSagaWorker(): Generator {
    const state = store.getState().requestsReducer.transportationRequests.requests

    const res = yield call(() => fetchData(state))
    //@ts-ignore
    yield put(fetchRequests(res))
}

function* requestsSaga() {
    yield takeEvery('requests/getFetchRequests', requestsSagaWorker)
}

export default requestsSaga