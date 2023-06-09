import React from 'react';
import Bootstrap from '../components/bootstrap'
import { Provider } from 'react-redux';
import store from '../stores/configureStore'
import styled from 'styled-components'
import Pullable from '../components/pullable'

export default {
	title: 'Pullable__Test',
};

let ListContainer = styled.div`
	.pullable-container{
		background-color: #efeff4;
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			text-align: center;
	
			li {
				background-color: #fff;
				border-bottom: 1px solid #ccc;
				p {
					margin: 0;
					line-height: 3em;
				}
			}
		}
	}
`
class ExampleComponent extends React.Component {

	componentDidMount() {
		this.setState({
			loading: true,
			initializing: 1
		}); 
		setTimeout(() => { // 待声明周期函数加载完成渲染DOM
			this.setState({
				listLen: 9,
				hasMore: 1,
				initializing: 2, // initialized
				loading: false
			}); 
		}, 1e3);
	}  

	state = {
		canRefreshResolve: 1,
		listLen: 0, // List长度
		hasMore: 0, // 是否加载更多 true/false
		initializing: 1,
		refreshedAt: Date.now(),
		loading: true // 加载状态
	};

	refresh = (resolve, reject) => {
		console.log("父 refresh 函数")
		this.setState({
			loading: true,
			initializing: 1
		});
		setTimeout(() => {
			const { canRefreshResolve } = this.state;
			if (!canRefreshResolve) reject();
			else {
				this.setState({
					listLen: 9,
					hasMore: 1,
					refreshedAt: Date.now(),
					loading: false
				});

				resolve();
			}
		}, 2e3);
	}

	// 加载更多，子组件调用
	loadMore = (resolve) => {
		this.setState({ loading: true });
		setTimeout(() => {
			const { listLen } = this.state;
			const l = listLen + 9; 

			this.setState({
				listLen: l,
				hasMore: l > 0 && l < 50, 	//  true || >= 50 fasle
				loading: false
			});

			resolve(); // 子调父后，回调处理状态
		}, 500);
	}


	toggleCanRefresh = () => {
		const { canRefreshResolve } = this.state;
		this.setState({ canRefreshResolve: !canRefreshResolve });
	}

	render() { 
		const { listLen, hasMore, initializing, loading, refreshedAt, canRefreshResolve } = this.state;
		// console.log(loading) // true  ture  false
		// console.log(hasMore) // 0 1 0 1 
		// console.log(listLen) // 0 9

		const list = []; 
		if (listLen) {
			for (let i = 0; i < listLen; i++) {
				list.push((
					<li key={i}>
						<p>{i}</p>
					</li>
				));
			}
		}
		return (
			<div>
				{( 
					<Pullable
						onRefresh={this.refresh}
						onLoadMore={this.loadMore}
						hasMore={hasMore}
						initializing={initializing}
						loading={loading}
						autoLoadMore
					>
						<ul>{list}</ul>
					</Pullable>
				)}
			</div>
		);
	}
}

export const base封装下拉刷新 = () => (
	<ListContainer>
		<ExampleComponent />
	</ListContainer>
)
