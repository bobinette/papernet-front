// For a reason that I ignore, the content of this file
// cannot be simply put in src/index.js.

import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'; // eslint-disable-line import/no-extraneous-dependencies

export default useRouterHistory(createHashHistory)({ queryKey: false });
