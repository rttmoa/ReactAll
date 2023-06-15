import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RecommendWrapper, RecommendItem } from '../style';

import imgUrl from '../images/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png'




class Recommend extends PureComponent {
	render() {
		return (
			<RecommendWrapper>
				{
					this.props.list.map((item) => {
						// console.log(item.get('imgUrl'))
						// return <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')} />
						return <RecommendItem imgUrl={imgUrl} key={item.get('id')} />
					})
				}
			</RecommendWrapper>
		)
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'recommendList'])
})

export default connect(mapState, null)(Recommend);