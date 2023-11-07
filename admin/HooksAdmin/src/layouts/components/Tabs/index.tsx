/* eslint-disable prettier/prettier */
import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setTabsList } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import MoreButton from "./components/MoreButton";
import "./index.less";
import React from "react";
const { TabPane } = Tabs;







const LayoutTabs = (props: any) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { tabsList } = props.tabs;
	const { themeConfig } = props.global;
	const { setTabsList } = props;
	const [activeValue, setActiveValue] = useState<string>(pathname);
	// console.log(activeValue == pathname) // true

	useEffect(() => {
		addTabs();
	}, [pathname]);

	// click tabs
	const clickTabs = (path: string) => {
		navigate(path);
	};

	// add tabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		setTabsList(newTabsList);
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath?: string) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("你删除了Tabs标签 😆😆😆");
		setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath));
	};

	return (
		// Tabs: https://4x.ant.design/components/tabs-cn/
		<React.Fragment>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						animated
						activeKey={activeValue}
						onChange={clickTabs}
						hideAdd
						type="editable-card"
						onEdit={path => { delTabs(path as string); }}
					>
						{tabsList.map((item: Menu.MenuOptions) => {
							return (
								<TabPane key={item.path}
									tab={
										<span>
											{item.path == HOME_URL ? <HomeFilled /> : ""}
											{item.title}
										</span>
									}
									closable={item.path !== HOME_URL}
								></TabPane>
							);
						})}
					</Tabs>
					<MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={setTabsList}></MoreButton>
				</div>
			)}
		</React.Fragment>
	);
};
const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setTabsList };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
