import { fork } from 'redux-saga/effects';

// Gather the scene sagas
import { watchFetchSaga, watchUpdateFiltersSaga, wathUpdatePaginationSaga } from './fetch';

// Gather the sub-scenes sagas

// Gather the sub-components sagas

export default function* sagas() {
  yield [
    // Scene
    fork(watchFetchSaga),
    fork(watchUpdateFiltersSaga),
    fork(wathUpdatePaginationSaga),

    // Sub-scenes

    // Sub-components
  ];
}
