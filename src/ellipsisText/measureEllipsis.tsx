import React, { useCallback } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';

import Resize from '../resize';
import type { IEllipsisTextProps } from './index';
import useEllipsisTextStyle from './useEllipsisTextStyle';
import { getValidContainerElement } from './utils';

/**
 * @description 内部组件：dynamic 开启时通过动态测量判断文本是否溢出。
 */
const MeasureEllipsis = (props: IEllipsisTextProps) => {
    const { value, title = value, className, maxWidth, ...otherProps } = props;
    const [textRef, isOverflow, style, onResize] = useEllipsisTextStyle(value, maxWidth);

    // 监听容器尺寸变化以重新测量
    const observerEle = textRef.current?.parentElement
        ? getValidContainerElement(textRef.current?.parentElement)
        : null;

    const renderText = useCallback(() => {
        return (
            <span
                ref={textRef}
                className={classNames('dtc-ellipsis-text', className)}
                style={style}
            >
                {typeof value === 'function' ? value() : value}
            </span>
        );
    }, [style, value, className]);

    return (
        <Resize onResize={onResize} observerEle={observerEle}>
            {isOverflow ? (
                <Tooltip title={title} mouseEnterDelay={0} mouseLeaveDelay={0} {...otherProps}>
                    {renderText()}
                </Tooltip>
            ) : (
                renderText()
            )}
        </Resize>
    );
};

export default MeasureEllipsis;
