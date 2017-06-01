import { fork } from 'redux-saga/effects';

// Gather the scene sagas
import watchImportBookmarksSaga from './imports';

// Gather the sub-scenes sagas

// Gather the sub-components sagas
import fileLoaderSagas from '../../components/file-loader/api/sagas';

export default function* sagas() {
  yield [
    // Scene
    fork(watchImportBookmarksSaga),

    // Sub-scenes

    // Sub-components
    fork(fileLoaderSagas),
  ];
}
