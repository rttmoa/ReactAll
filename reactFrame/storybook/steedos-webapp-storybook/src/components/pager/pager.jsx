/**
 * # Stateless Pager component
 *
 * ## Usage
 * ```
 * <Pager current={3}
 *        total={20}
 *        visiblePages={5}
 *        onPageChanged={this.handlePageChanged}
 *        titles={{
 *            first:   "First",
 *            prev:    "Prev",
 *            prevSet: "<<<",
 *            nextSet: ">>>",
 *            next:    "Next",
 *            last:    "Last"
 *        }} />
 * ```
 *
 * ## How it looks like
 * ```
 * First | Prev | ... | 6 | 7 | 8 | 9 | ... | Next | Last
 * ```
 *
 */

import React from 'react';
import PropTypes from 'prop-types';


/**
 * ## Constants
 */
const BASE_SHIFT  = 0;
const TITLE_SHIFT = 1;

const TITLES = {
	first:   'First',
	prev:    '\u00AB',
	prevSet: '...',
	nextSet: '...',
	next:    '\u00BB',
	last:    'Last',
};


/**
 * ## Constructor
 */
class Pager extends React.Component {
	constructor(props) {
		super(props); 
		this.handleFirstPage     = this.handleFirstPage.bind(this);
		this.handlePreviousPage  = this.handlePreviousPage.bind(this);
		this.handleNextPage      = this.handleNextPage.bind(this);
		this.handleLastPage      = this.handleLastPage.bind(this);
		this.handleMorePrevPages = this.handleMorePrevPages.bind(this);
		this.handleMoreNextPages = this.handleMoreNextPages.bind(this);
		this.handlePageChanged   = this.handlePageChanged.bind(this);
	}

    /* ========================= HELPERS ==============================*/
	getTitles(key) {
		return this.props.titles[key] || TITLES[key];
	}

    /**
     * Calculates "blocks" of buttons with page numbers.
     */
	calcBlocks() {
		const props = this.props;
		const total = props.total;
		const visiblePages = props.visiblePages;
		const current = props.current + TITLE_SHIFT;

		const blocks = Math.ceil(total / visiblePages);
		const currBlock = Math.ceil(current / visiblePages) - TITLE_SHIFT;

		return {
			total:    blocks,
			current:  currBlock,
			size:     visiblePages,
		};
	}
	/** #### First/Prev 禁止状态 ---*/
	isPrevDisabled() {
		// 如果是第一个 那么按钮将禁止
		// console.log(this.props.current)
		return this.props.current <= BASE_SHIFT;
	}
	/** #### Next/Last 禁止状态 ---**/
	isNextDisabled() {
		// console.log("禁止！")
		// console.log(this.props.current) // 当前 index: 0-10
		// console.log(this.props.total)   // 11
		// console.log(TITLE_SHIFT)        // 1
		return this.props.current >= (this.props.total - TITLE_SHIFT);
	}

	/** ### Prev ... 是否隐藏 ---**/
	isPrevMoreHidden() {
		const blocks = this.calcBlocks(); // {total: 3, current: 1, size: 4} 
		return (blocks.total === TITLE_SHIFT) || (blocks.current === BASE_SHIFT); // 条件：仅一页 或 第一页
	}
	/** ### Next ... 是否隐藏 ---**/
	isNextMoreHidden() {
		const blocks = this.calcBlocks();
		return (blocks.total === TITLE_SHIFT) || (blocks.current === (blocks.total - TITLE_SHIFT)); // 条件：仅一页 或 最后一页
	}

	visibleRange() {
		const blocks = this.calcBlocks();
		const start = blocks.current * blocks.size;
		const delta = this.props.total - start;
		const end = start + ((delta > blocks.size) ? blocks.size : delta);

		return [start + TITLE_SHIFT, end + TITLE_SHIFT];
	}

 
    /* ========================= HANDLERS =============================*/
	/***--- 按钮：点击起始页 ---**/
	handleFirstPage() {
		if (!this.isPrevDisabled()) this.handlePageChanged(BASE_SHIFT); // 设置 current = 1
	}
	/***--- 按钮：点击上一页 ---**/
	handlePreviousPage() {
		if (!this.isPrevDisabled()) this.handlePageChanged(this.props.current - TITLE_SHIFT); // 设置 current = current - 1
	}
	/***--- 按钮：点击下一页 ---**/
	handleNextPage() {
		if (!this.isNextDisabled()) this.handlePageChanged(this.props.current + TITLE_SHIFT); // 设置 current = current + 1
	}
	/***--- 按钮：点击最终页 ---**/
	handleLastPage() {
		if (!this.isNextDisabled()) this.handlePageChanged(this.props.total - TITLE_SHIFT); // 设置 current = total - 1
	}

	/** #### 点击 ... 显示前序的页码 ---*/
	handleMorePrevPages() {
		const blocks = this.calcBlocks();
		this.handlePageChanged((blocks.current * blocks.size) - TITLE_SHIFT);
	}
    /** #### 点击 ... 显示后序的页码 ---*/
	handleMoreNextPages() {
		const blocks = this.calcBlocks();
		this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
	}
	/***--- set current value ---**/
	handlePageChanged(num) {
		const handler = this.props.onPageChanged;
		handler && handler(num);
	}


    /* ========================= RENDERS ==============================*/
    /**
     * ### renderPages()
     * Renders block of pages' buttons with numbers.
     * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
     * @return {React.Element[]} - array of React nodes.
     */
	renderPages(pair) {
		// console.log(pair) // [5, 9]
		// console.log(range(pair[0], pair[1])) // [5, 6, 7, 8]
		return range(pair[0], pair[1]).map((num, idx) => {
			const current = num - TITLE_SHIFT;
			const onClick = this.handlePageChanged.bind(this, current);
			const isActive = (this.props.current === current);

			return (
				<Page
					key={idx}
					index={idx}
					isActive={isActive}
					className="btn-numbered-page"
					onClick={onClick}
					// isHidden 
				>
					{num}
				</Page>
			);
		});
	}


	render() {
		const titles = this.getTitles.bind(this);
		let className = "pagination";
		if (this.props.className) {
			className += " " + this.props.className;
		}

		return (
			<nav>
				<ul className={className}>
					{/* 最开始 */}
					<Page
						className="btn-first-page"
						key="btn-first-page"
						isDisabled={this.isPrevDisabled()}
						onClick={this.handleFirstPage}
					>{titles('first')}</Page>
					{/* 上一页 */}
					<Page
						className="btn-prev-page"
						key="btn-prev-page"
						isDisabled={this.isPrevDisabled()}
						onClick={this.handlePreviousPage}
					>{titles('prev')}</Page>
					{/* ... */}
					<Page
						className="btn-prev-more"
						key="btn-prev-more"
						isHidden={this.isPrevMoreHidden()}
						onClick={this.handleMorePrevPages}
					>{titles('prevSet')}</Page>

					{this.renderPages(this.visibleRange())}

					{/* ... */}
					<Page
						className="btn-next-more"
						key="btn-next-more"
						isHidden={this.isNextMoreHidden()}
						onClick={this.handleMoreNextPages}
					>{titles('nextSet')}</Page>
					{/* 下一页 */}
					<Page
						className="btn-next-page"
						key="btn-next-page"
						isDisabled={this.isNextDisabled()}
						onClick={this.handleNextPage}
					>{titles('next')}</Page>
					{/* 最后 */}
					<Page
						className="btn-last-page"
						key="btn-last-page"
						isDisabled={this.isNextDisabled()}
						onClick={this.handleLastPage}
					>{titles('last')}</Page>
				</ul>
			</nav>
		);
	}
}
Pager.propTypes = {
	current:           PropTypes.number,
	total:             PropTypes.number.isRequired,
	visiblePages:      PropTypes.number,
	titles:            PropTypes.object,
	onPageChanged:     PropTypes.func,
};
Pager.defaultProps = {
	current: 0,
	visiblePages: 3,
	titles: TITLES
};

const Page = ({isHidden, className, isActive, isDisabled, index, onClick, children  }) => {
	if (isHidden) return null;

	const baseCss = className ? `${className} ` : '';
	const fullCss = `${baseCss}${isActive ? ' active' : ''}${isDisabled ? ' disabled' : ''}`;

	return (
		<li key={index} className={fullCss}>
			<a onClick={onClick}>{children}</a>
		</li>
	);
};

// const Page = (props) => {
// 	if (props.isHidden) return null;
// 	const baseCss = props.className ? `${props.className} ` : '';
// 	const fullCss = `${baseCss}${props.isActive ? ' active' : ''}${props.isDisabled ? ' disabled' : ''}`;
// 	return (
// 		<li key={props.index} className={fullCss}>
// 			<a onClick={props.onClick}>{props.children}</a>
// 		</li>
// 	);
// };
Page.propTypes = {
	isHidden:   PropTypes.bool,
	isActive:   PropTypes.bool,
	isDisabled: PropTypes.bool,
	className:  PropTypes.string,
	onClick:    PropTypes.func,
};

/** #### @param (start, end] ---*/
function range(start, end) {
	const res = [];
	for (let i = start; i < end; i++) {
		res.push(i);
	}
	return res;
}

export default Pager;
