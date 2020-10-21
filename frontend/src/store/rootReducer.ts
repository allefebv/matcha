import { AnyAction, combineReducers } from "redux";

import { userReducer } from "./user/reducer";
import { uiReducer } from "./ui/reducer";
import { profilesListReducer } from "./profilesLists/reducer";

export const rootReducer = (state: any, action: AnyAction) => {
	if (action.type === "USER.USERLOGOUT") {
		state = undefined;
	}
	return appReducer(state, action);
};

const appReducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
	profilesList: profilesListReducer,
});
