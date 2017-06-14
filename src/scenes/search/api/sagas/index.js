import { fork } from 'redux-saga/effects';

// Gather the scene sagas
import watchImportPaperSagas from './import';
import watchSearchSagas from './search';

// Gather the sub-scenes sagas

// Gather the sub-components sagas

export default function* sagas() {
  yield [
    // Scene
    fork(watchImportPaperSagas),
    fork(watchSearchSagas),

    // Sub-scenes

    // Sub-components
  ];
}
