import { moreThings } from './more-things';

import(/* webpackChunkName: "zyx" */ './components').then(({ superCool }) => {
  superCool();
  moreThings();
});