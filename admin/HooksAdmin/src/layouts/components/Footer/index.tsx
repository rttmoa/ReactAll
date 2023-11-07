import { connect } from "react-redux";
import "./index.less";
import React from "react";

const LayoutFooter = (props: any) => {
	const { themeConfig } = props;
	return (
		<React.Fragment>
			{!themeConfig.footer && (
				<div className="footer">
					<a href="http://www.spicyboy.cn/" target="_blank" rel="noreferrer">
						2022 © Hooks-Admin By Hooks Technology.
					</a>
				</div>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
