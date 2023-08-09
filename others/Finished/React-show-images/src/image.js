import React, { Component } from "react";





export default class ShowImg extends Component {
  constructor(props) {
    super(props);
    const { firstIndex, data, showimgs } = this.props;
    this.state = {
      f: firstIndex || 0, // 点击的第几个img
      R: 0,   // rotate
      S: 1,   // scale 倍数
      i: 0,   // 
      SS: 1,  // scale
      data: data || [], // data[]
      showimgs: showimgs || false // 是否显示ShowImg组件
    };
  }
  
  componentWillReceiveProps(props) {
    // 钩子函数：
      // 初次不会渲染
      // props变化时钩子会执行
      // 在这个函数中，旧的属性仍可通过this.props获取
    this.setState({ f: props.firstIndex });
  }

  // 向左预览
  leftshow = () => {
    const imgsIndex = this.state.f; // 当前的data[]索引下标
    if (imgsIndex == 0) {
      this.setState({ f: 4, R: 0, S: 1, i: 0, SS: 1 });
    } else {
      this.setState({ f: imgsIndex - 1, R: 0, S: 1, i: 0, SS: 1 });
    }
    this.refs.imgstyle.setAttribute("src", this.props.data[imgsIndex]);
  };

  // 向右预览
  rightshow = () => {
    if (this.state.f == 4) {
      this.setState({ f: 0, R: 0, S: 1, i: 0, SS: 1 });
    } else {
      this.setState({ f: this.state.f + 1, R: 0, S: 1, i: 0, SS: 1 });
    }
    this.refs.imgstyle.setAttribute("src", this.props.data[this.state.f]);
  };

  // 顺时针旋转
  rotateright = () => {
    const { R, SS } = this.state; // 解构出：旋转度数 + 缩放倍数
    this.setState({ R: R + 90 });
    this.refs.imgstyle.style.transform = "translate(-50% ,-50%) rotate(" + R + "deg) scale(" + SS + "," + SS + ")";
  };

  // 逆时针旋转
  rotateleft = () => {
    const { R, SS } = this.state; // 解构出：旋转度数 + 缩放倍数
    this.setState({ R: R - 90 });
    this.refs.imgstyle.style.transform = "translate(-50% ,-50%) rotate(" + R + "deg) scale(" + SS + "," + SS + ")";
  };

  // 放大
  showbig = () => {
    const { R, SS, i, S } = this.state; // 先缩小再放大就可以看到 i和S的变化
    if (i >= 0) {
      console.log("放大 -> 从Init到放大")
      this.setState({
        S: S + 1,
        i: i + 1,
        SS: 1 * (S + 1)
      });
    } else {
      console.log("放大 -> 从缩小到Init")
      this.setState({
        S: S - 1,
        i: i + 1,
        SS: 1 / (S - 1)
      });
    }
    this.refs.imgstyle.style.transform = "translate(-50% ,-50%) rotate(" + R + "deg) scale(" + SS + "," + SS + ")";
  };

  // 缩小
  showmin = () => {
    const { R, SS, i, S  } = this.state;
    if (i <= 0) {
      console.log("缩小 -> 从Init到缩小")
      this.setState({
        S: S + 1,
        i: i - 1,
        SS: 1 / (S + 1)
      });
    } else {
      console.log("缩小 -> 从缩小到Init")
      this.setState({
        S: S - 1,
        i: i - 1,
        SS: 1 * (S - 1)
      });
    }
    this.refs.imgstyle.style.transform = "translate(-50% ,-50%) rotate(" + R + "deg) scale(" + SS + "," + SS + ")";
  };



  render() {
    const { toggleshow, showimgs } = this.props;
    const { data, f, R, SS } = this.state;
    let fontProps = {style: {fontSize: "30px"}}
    return (
      <div>
        {showimgs && (
          <div onDoubleClick={() => console.log()}>  
            <div className="dilong toggleshow" onClick={toggleshow}></div>
            <div className="bigimg toggleshow">
              <p className="close" onClick={toggleshow}>
                <i className="icon icon-close" {...fontProps}></i>
              </p>
              <img src={data[f]}
                className="imgstyle"
                style={{ transform: "translate(-50% ,-50%) rotate(" + R + "deg) scale(" + SS + "," + SS + ")"}}
                ref="imgstyle"
              />
              <p className="left" onClick={this.leftshow}>
                <i className="icon icon-left" {...fontProps}></i>
              </p>
              <p className="right" onClick={this.rightshow}>
                <i className="icon icon-right" {...fontProps}></i>
              </p>
              <p className="rotateright" onClick={this.rotateright}>
                <i className="icon icon-rturn" {...fontProps}></i>
              </p>
              <p className="rotateleft" onClick={this.rotateleft}>
                <i className="icon icon-lturn" {...fontProps}></i>
              </p>
              <p className="showbig" onClick={this.showbig}>
                <i className="icon icon-imgbig" {...fontProps}></i>
              </p>
              <p className="showmin" onClick={this.showmin}>
                <i className="icon icon-imgmin" {...fontProps}></i>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
