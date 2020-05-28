import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import eventReducer from './eventsReducer';

export default combineReducers({
    Login: LoginReducer,
    Dashboard: DashboardReducer,
    Event: eventReducer
});
