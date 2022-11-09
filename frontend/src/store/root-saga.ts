import { all } from 'redux-saga/effects';
import historySaga from './history/saga';

export default function* rootSaga() {
  yield all([historySaga()]);
}
