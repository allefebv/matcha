import { combineReducers } from 'redux';

import { userReducer } from './user/reducer';

// the browser history for the router middleware
// export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

// combineReducer applied on multiple reducers
export const rootReducer = combineReducers({
	user: userReducer,
});
