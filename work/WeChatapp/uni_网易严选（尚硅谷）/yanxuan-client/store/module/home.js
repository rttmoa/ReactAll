import req from '../../api/request.js'

export default {
	namespaced:true,
	state:{
		indexData: {} //首页数据
	},
	mutations:{
		// 修改数据
		setIndexDataMutation(state,payload){
			state.indexData=payload;
		}
	},
	// 写异步
	actions:{
		async getIndexDataAction({commit}){
			try {
				const res = await req('/getIndexData');  //小程序
				// const res = await req('/api/getIndexData');  //H5 跨域
				console.log(res);
				if (res.status == 200) {
					// this.indexData = res.indexData;
					commit('setIndexDataMutation',res.indexData)
				}
			} catch (e) {
				//TODO handle the exception
				console.log(e);
			}
		}
	},
	getters:{
		
	}
}