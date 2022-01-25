import {all} from 'redux-saga/effects'
import wordsSagaWatcher from "./wordsSaga";

export function* rootSaga() {
    yield all([
        wordsSagaWatcher()
    ])
}