import { GET_LIST_DATA, LEFT_CLICK,ADD_SELECTI_ITEM,MINUS_SELECTI_ITEM,SHOW_CHOOSE_CONTENT,CLEAR_CAR } from '../actions/actionTypes';



const initState = {
    listData: {food_spu_tags:[]},
    currentLeftIndex: 0,
    showChooseContent: false, // 是否展示购物车中的内容
    poiInfo: {}, // 商家信息
};

/** #### 切换左侧商品模块 ---*/
const itemClick = (state, action) =>{
    return {...state, currentLeftIndex: action.obj.currentLeftIndex}
}
/** #### 获取商家详情数据 ---*/
const getListData = (state, action) =>{
    // console.log(action) // action: {type: 'GET_LIST_DATA', obj: {data: {container_template: {…}food_spu_tags: Array(13), poi_info: {…}, …}, code: 0, msg: '成功'}} 
    if (state.listData.food_spu_tags.length > 0) {
        return {...state};
    }
    return {...state, poiInfo:action.obj.data, listData: action.obj.data || {food_spu_tags:[]}}
}
/***--- 展开 / 关闭购物车 ---**/
const chooseContent = (state, action) => {
    // console.log("chooseContent", action) // {type: 'SHOW_CHOOSE_CONTENT', obj: {obj: {flag: false}, type: 'SHOW_CHOOSE_CONTENT'}}
    return {...state, showChooseContent: action.obj.flag };
}
/** #### 清空购物车 ---*/
const clearCar = (state) => {
    let listData = state.listData;
    // 找到外层，左边list列表
    let list = listData.food_spu_tags || [];
    for (let i = 0 ; i< list.length ; i++) {
        let spus = list[i].spus || [];
        for (let j = 0 ; j < spus.length ; j++) {
            spus[j].chooseCount = 0;
        }
    }
    return {...state, listData: JSON.parse(JSON.stringify(listData)) };
}

/***--- 添加 + 商品 ---**/
const addSelectItem = (state, action) => {
    return {...state, listData: dealWithSelectItem(state, action, ADD_SELECTI_ITEM)}; // 处理选择的Item
}

/***--- 减少 - 商品 ---**/
const minusSelectItem = (state, action) => {
    return {...state, listData: dealWithSelectItem(state, action, MINUS_SELECTI_ITEM)};
}

/***--- 处理选择的商品， 加 / 减 ---**/
const dealWithSelectItem = (state, action, type) => {
    // console.log("商家详情信息", state.poiInfo.poi_info)
    // console.log("处理购物车 State", state) // state: {listData: {…}, currentLeftIndex: 0, showChooseContent: false, poiInfo: {…}}
    // console.log("处理购物车 Action", action) // action: {type: 'MINUS_SELECTI_ITEM', obj: {index: 3}} // 右侧的Item索引


    let listData = state.listData;

    let leftListArray = listData.food_spu_tags || []; // 左侧的13个模块

    let currentItem = leftListArray[action.outIndex || state.currentLeftIndex]; // 获取左侧13个模块中第几个模块的索引
    console.log("左侧模块数据", currentItem)
    console.log("右侧列表索引", action.obj)

    let rightItemIndex = action.obj.index; // 右侧Item索引值

    if (type === ADD_SELECTI_ITEM) { currentItem.spus[rightItemIndex].chooseCount ++; }
    else { currentItem.spus[rightItemIndex].chooseCount --; }

    let _listData = JSON.parse(JSON.stringify(listData));
    return _listData;
}

 

const menuReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_LIST_DATA: return getListData(state, action);
        // 点击左侧的索引index
        case LEFT_CLICK: return itemClick(state, action);
        // 购物车中增加相同的商品
        case ADD_SELECTI_ITEM: return addSelectItem(state, action);
        // 购物车中减少相同的商品
        case MINUS_SELECTI_ITEM: return minusSelectItem(state, action);
        // 显示/关闭 内容面板
        case SHOW_CHOOSE_CONTENT: return chooseContent(state, action);
        // 清空购物车
        case CLEAR_CAR: return clearCar(state, action);
        default: return state;
    }
};

export default menuReducer;