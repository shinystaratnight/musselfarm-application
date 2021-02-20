import { combineReducers, Dispatch } from 'redux';

import authReducer from './auth/auth.reducer';
import farmsReducer from './farms/farms.reducer';
import profileReducer from './profile/profile.reducer';
import uiReducer from './ui/ui.reducer';
import usersReducer from './users/users.reducer';
import budgetReducer from './budget/budget.reducer';
import subscriptReducer from './subscription/subscription.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  farms: farmsReducer,
  profile: profileReducer,
  ui: uiReducer,
  users: usersReducer,
  budget: budgetReducer,
  subscription: subscriptReducer,
});

export default rootReducer;
export type IRootState = ReturnType<typeof rootReducer> | any;
export type IThunkType = Dispatch;
