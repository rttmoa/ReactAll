import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
export type TransitionProps<Ref extends HTMLElement | undefined = undefined> = CSSTransitionProps<Ref> & {
    animation?: AnimationName;
    /***--- 添加一层dom, 避免 内置 transition冲突 ---**/
    wrapper?: boolean;
};
/**
 * ### CSS过渡效果 包裹着内部的children
 * #### animation? | wrapper?
 */
declare const Transition: React.FC<TransitionProps>;
export default Transition;
