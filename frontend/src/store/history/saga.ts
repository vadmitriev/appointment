import { AxiosError, AxiosResponse } from 'axios';
import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { historyActions, HistoryState } from './historySlice';
import HistoryService from '@/api/HistoryService';
import { EventResponse, IEvent, ResourceResponse } from '@/interfaces';

const getEvents = (state: HistoryState) => state.events;

function* loadEvents() {
  try {
    const response: AxiosResponse<EventResponse> = yield call(
      HistoryService.loadEvents,
    );
    yield put(historyActions.loadEventsSuccess(response.data.items));
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof AxiosError) {
      yield put(historyActions.loadEventsError(e.response?.data));
    }
    yield put(historyActions.loadEventsError('Some error occured'));
  }
}

function* loadResources() {
  try {
    const events: IEvent[] = yield select(getEvents);
    const ids = events.map((e) => `${e.name}/${e.id}`);
    const response: AxiosResponse<ResourceResponse> = yield call(
      HistoryService.loadResources,
      ids,
    );
    yield put(historyActions.loadResourcesSuccess(response.data.items));
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError) {
      yield put(historyActions.loadResourcesError(e.response?.data));
    }
    yield put(historyActions.loadResourcesError('Some error occured'));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(historyActions.loadEvents.type, loadEvents),
    takeEvery(historyActions.loadResources.type, loadResources),
  ]);
}
