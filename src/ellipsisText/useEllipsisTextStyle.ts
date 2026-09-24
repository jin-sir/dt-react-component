import { CSSProperties, RefObject, useLayoutEffect, useReducer, useRef } from 'react';

import {
    DEFAULT_MAX_WIDTH,
    getEllipsisCursorStyle,
    getRangeWidth,
    getStyle,
    getTextContainerWidth,
} from './utils';

const forceUpdateReducer = (num: number): number => (num + 1) % 1_000_000;
export default function useEllipsisTextStyle<T, E extends HTMLElement>(
    value: T,
    maxWidth?: string | number
): [RefObject<HTMLSpanElement>, boolean, CSSProperties, () => void] {
    const [, forceUpdate] = useReducer(forceUpdateReducer, 0);

    const textStyle = useRef<CSSProperties>({ maxWidth: DEFAULT_MAX_WIDTH, cursor: 'default' });
    const isOverflow = useRef<boolean>(false);

    const textRef = useRef<E>(null);

    useLayoutEffect(() => {
        updateTextStyle();
    }, [value, maxWidth]);

    /**
     * @description: 计算文本是否溢出，并据此更新宽度与 hover 手势
     */
    const updateTextStyle = () => {
        const textNode = textRef.current;
        if (!textNode) return;

        const prevStyle = textStyle.current;
        const prevOverflow = isOverflow.current;

        const textContainerWidth = getTextContainerWidth(textNode, maxWidth);

        // 先更新溢出状态，cursor 解析依赖最新的溢出结果
        isOverflow.current = getRangeWidth(textNode) > textContainerWidth;
        const cursor = getEllipsisCursorStyle(
            getStyle(textNode.parentElement, 'cursor'),
            isOverflow.current
        );
        textStyle.current = { ...textStyle.current, maxWidth: textContainerWidth, cursor };

        // 未发生实际变更时跳过强制渲染，避免随窗口 resize 触发无意义的更新
        const hasChanged =
            isOverflow.current !== prevOverflow ||
            textStyle.current.maxWidth !== prevStyle.maxWidth ||
            textStyle.current.cursor !== prevStyle.cursor;
        if (hasChanged) forceUpdate();
    };

    return [textRef, isOverflow.current, textStyle.current, updateTextStyle];
}
