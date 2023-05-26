import { useState, useEffect } from 'react';



// 1.界面需要根据窗口重新布局；
// 2.在页面滚动时，需要根据滚动位置来决定是否显示一个”返回顶部“的按钮。
// 这都需要用到浏览器的api来监听这些状态的变化。那么我们就可以滚动条位置的场景为例，来看看因该如何用Hooks优雅的监听浏览器状态。


// 获取横向，纵向滚动条位置
const getPosition = () => {
  return {
    x: document.body.scrollLeft,
    y: document.body.scrollTop,
  };
};
const useScroll = () => {
  // 定一个 position 这个 state 保存滚动条位置
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition(document));
    };
    // 监听 scroll 事件，更新滚动条位置
    document.addEventListener("scroll", handler);
    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener("scroll", handler);
    };
  }, []);
  return position;
};

export default useScroll