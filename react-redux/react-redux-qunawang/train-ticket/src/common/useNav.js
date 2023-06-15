import { useCallback } from 'react';
import { h0 } from './fp';






// 处理前一天 后一天 是否可以点击前后按钮
export default function useNav(departDate, dispatch, prevDate, nextDate) {

    const isPrevDisabled = h0(departDate) <= h0();
    const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;

    /***--- 点击 上一页 + prevDate发送到redux ---**/
    const prev = useCallback(() => {
        if (isPrevDisabled) {
            return;
        }
        dispatch(prevDate());
    }, [isPrevDisabled]);

    /***--- 点击 下一页 + nextDate发送到redux ---**/
    const next = useCallback(() => {
        if (isNextDisabled) {
            return;
        }
        dispatch(nextDate());
    }, [isNextDisabled]);

    return {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    };
}
