import React, { Component } from "react";
import "./App.css";
import ShowImg from "./image";

import CropperPro from 'react-cropper-pro'



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        "http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
        "http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
        "http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
        "http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
        "http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
      ], 
      _html: "",
      showimgs: false,  // 必须字段控制弹框显示隐藏
      firstIndex: 0     // data[] 索引下标
    };
  } 



  render() {
    const { firstIndex, showimgs, data } = this.state;
    const showimg = i => { 
      this.setState({ showimgs: true, firstIndex: i });
    }
    const toggleshow = () => { 
      this.setState({ showimgs: false });
    }
    return (
      <React.Fragment>
        <div className="title">
          baby张的react+css3图片预览demo,缩放，旋转，切换
          <p>Github地址：  <a href="https://github.com/babybrotherzb" target="_blank">Github</a></p> 
          <p>博客地址： <a href="https://blog.csdn.net/weixin_43648947" target="_blank">blog</a></p> 
        </div><hr /><br /><br /><br />

        <div className="custcontent">
          <div className="showimg">
            <h4>ShowImg</h4>
            {data.map((item, i) => {
              return (
                <img key={item} style={{ width: 200, height: 150, marginRight: 15 }}
                  src={item}
                  onClick={() => showimg(i)} 
                />
              );
            })} 
          </div><br /> 
          <div className="custcontent">
            <div className="showimg">
              <h4>CropperPro</h4>
              <CropperPro
                // 弹窗：裁切设置
                defaultImg="https://img1.baidu.com/it/u=2332022306,1629767074&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                onChange={file => console.log()}
                onDel={image => console.log()}
              />
            </div>
          </div>
          <ShowImg
            // 弹窗：点击data[]中图片显示的弹窗：放大、缩小、翻页
            data={data}                     // 将data[]传入ShowImg
            firstIndex={firstIndex}         // data[]第几个索引下标
            showimgs={showimgs}             // ShowImg开启/关闭
            toggleshow={toggleshow}         // 关闭ShowImg
          ></ShowImg>
        </div>

      </React.Fragment>
    );
  }
}
