import { AxiosError, AxiosResponse } from 'axios';
import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { historyActions } from './historySlice';
import HistoryService from '@/api/HistoryService';
import { EventResponse, IEvent, ResourceResponse } from '@/interfaces';
import { RootState } from '..';
import { getItemsSlice, groupEvents } from '@/helpers';

const getEvents = (state: RootState) => state.history.events;
const getPage = (state: RootState) => state.history.page;
const getItemsPerPage = (state: RootState) => state.history.itemsPerPage;

function* loadEvents() {
  try {
    const response: AxiosResponse<EventResponse> = yield call(
      HistoryService.loadEvents,
    );

    const sortedEvents = groupEvents(response.data.items);

    yield put(historyActions.loadEventsSuccess(sortedEvents));
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof AxiosError) {
      yield put(historyActions.loadEventsError(e.message));
      return;
    }
    yield put(historyActions.loadEventsError('Some error occured'));
  }
}

function* loadResources() {
  try {
    const events: IEvent[] = yield select(getEvents);
    const page: number = yield select(getPage);
    const itemsPerPage: number = yield select(getItemsPerPage);

    const eventsSlice = getItemsSlice(events, page, itemsPerPage);

    const ids = eventsSlice.map((e) => `${e.name}/${e.id}`);
    if (ids.length === 0) return;

    const response: AxiosResponse<ResourceResponse> = yield call(
      HistoryService.loadResources,
      ids,
    );

    yield put(historyActions.loadResourcesSuccess(response.data.items));
  } catch (e) {
    console.error(e);
    if (e instanceof AxiosError) {
      yield put(historyActions.loadResourcesError(e.message));
      return;
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
