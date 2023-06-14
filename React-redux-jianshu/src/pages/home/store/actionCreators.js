import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changHomeData = (result) => ({
	type: constants.CHANGE_HOME_DATA,
	topicList: result.topicList,
	articleList: result.articleList,
	recommendList: result.recommendList
});
// 更多数据：存储redux
const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
})
/** #### 获取主页数据 ---*/
export const getHomeInfo = () => {
	return (dispatch) => {
		axios.get('/api/home.json').then((res) => {
			console.log(res)
			const result = res.data.data; 
			dispatch(changHomeData(result));
		});
	}
}
/** #### 主页：获取更多数据 ---*/
export const getMoreList = (page) => {
	return (dispatch) => {
		axios.get('/api/homeList.json?page=' + page).then((res) => {
			const result = res.data.data;
			dispatch(addHomeList(result, page + 1));
		});
	}
}
/** #### 是否显示顶部菜单   scrollTop是否大于100 ---*/
export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
})