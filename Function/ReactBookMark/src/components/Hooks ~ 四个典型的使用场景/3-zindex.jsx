import React, { useCallback } from "react";
import useScroll from "./3-useScroll";




// 通过这个例子，我们看到了如何将浏览器状态变成可被 React 组件绑定的数据源，从而在使用上更加便捷和直观。
// 当然，除了窗口大小、滚动条位置这些状态，还有其它一些数据也可以这样操作，
// 比如 cookies，localStorage, URL，等等。你都可以通过这样的方法来实现
function ScrollTop() {

  const { y } = useScroll();
    console.log(y)

  const goTop = useCallback(() => {
    document.body.ScrollTop = 0;
  }, []);

  const style = {
    position: "fixed",
    right: "10px",
    buttom: "10px",
  };

  if (y > 300) {
    return <button onClick={goTop} style={style}>Back to Top</button>
  } else {
    return null;
  }
}

export default ScrollTop;
