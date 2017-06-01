import { fork } from 'redux-saga/effects';

// Gather the scene sagas
import watchProvidersSaga from './providers';

// Gather the sub-scenes sagas
import googleLoginSagas from '../../scenes/google/api/sagas';

// Gather the sub-components sagas
import emailSagas from '../../components/email/api/sagas';
import googleSagas from '../../components/google/api/sagas';

export default function* sagas() {
  yield [
    // Scene
    fork(watchProvidersSaga),

    // Sub-scenes
    fork(googleLoginSagas),

    // Sub-components
    fork(emailSagas),
    fork(googleSagas),
  ];
}
