import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
import imgUrl from '../images/3aea_xll.jpg'




class List extends PureComponent {
	render() {
		const { list, getMoreList, page } = this.props;
		return (
			<div>
				{
					// 文章数据
					list.map((item, index) => {
						return (
							<Link key={index} to={'/detail/' + item.get('id')}>
								<ListItem>
									<img alt='' className='pic' src={imgUrl} />
									<ListInfo>
										<h3 className='title'>{item.get('title')}</h3>
										<p className='desc'>{item.get('desc')}</p>
									</ListInfo>
								</ListItem>
							</Link>
						);
					})
				}
				{/* TODO: 点击更多文字 加载新数据 page+1 */}
				<LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
			</div>
		)
	}
}
const mapState = (state) => ({
	list: state.getIn(['home', 'articleList']),
	page: state.getIn(['home', 'articlePage'])
});
const mapDispatch = (dispatch) => ({
	getMoreList(page) {
		// TODO: page是redux存储的最新数据
		dispatch(actionCreators.getMoreList(page))
	}
})
export default connect(mapState, mapDispatch)(List);