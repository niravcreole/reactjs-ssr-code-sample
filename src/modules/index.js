import { combineReducers } from 'redux';

import auth from './auth/reducer';
import checkAddressStore from './checkAddress/reducer';
import nbnPlansStore from './nbnPlans/reducer';
import nbnSpeedStore from './nbnSpeed/reducer';
import leadStore from './leads/reducer';

import client from './apolloClient';

export default combineReducers({
  auth,
  checkAddressStore,
  nbnPlansStore,
  nbnSpeedStore,
  leadStore,
  apollo: client.reducer(),
});
