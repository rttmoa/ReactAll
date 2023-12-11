import React from "react";
import { Layout } from "antd";
import { RootState, useSelector } from "@/redux";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight";
import LayoutMenu from "@/layouts/components//Menu";
import LayoutMain from "@/layouts/components/Main";
import logo from "@/assets/images/Pro-128x128.png";
import "./index.less"; // todo 垂直布局 LESS

const { Header, Sider } = Layout;
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;

// TODO: 一、垂直布局 - loyout-vertical
const LayoutVertical: React.FC = () => {
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse); // 设置 》 折叠菜单

  return (
    // ! 左右布局
    <section className="layout-vertical">
      <Sider width={210} collapsed={isCollapse}>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          {!isCollapse && <h2 className="logo-text">{APP_TITLE}</h2>}
        </div>
        <LayoutMenu mode="inline" />
      </Sider>
      <Layout>
        <Header>
          <ToolBarLeft />
          <ToolBarRight />
        </Header>
        <LayoutMain />
      </Layout>
    </section>
  );
};

export default LayoutVertical;
