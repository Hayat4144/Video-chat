import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const MainReducer = combineReducers({
  User: UserReducer,
});

export default MainReducer;
