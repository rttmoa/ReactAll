import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';




const reducer = combineReducers({
	header: headerReducer, // state.getIn(['header', 'focused']) - 表示header属性中的 focused值
	home: homeReducer,
	detail: detailReducer,
	login: loginReducer, // state.getIn(['login', 'login']) - 表示login属性值中的 login值
});

export default reducer;
