import { fork } from 'redux-saga/effects';

// Gather the scene sagas
import watchImportPaperSaga from './import';
import { watchSearchSaga, watchUpdateOffsetSaga } from './search';

// Gather the sub-scenes sagas

// Gather the sub-components sagas

export default function* sagas() {
  yield [
    // Scene
    fork(watchImportPaperSaga),
    fork(watchSearchSaga),
    fork(watchUpdateOffsetSaga),

    // Sub-scenes

    // Sub-components
  ];
}
