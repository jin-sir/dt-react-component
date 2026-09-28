import React, { ReactNode } from 'react';
import { Typography } from 'antd';
import { AbstractTooltipProps, RenderFunction } from 'antd/lib/tooltip';
import { omit } from 'lodash-es';

import MeasureEllipsis from './measureEllipsis';
import { DEFAULT_MAX_WIDTH } from './utils';
import './style.scss';

export { DEFAULT_MAX_WIDTH };

export interface IEllipsisTextProps extends AbstractTooltipProps {
    /**
     * 文本内容
     */
    value: ReactNode | RenderFunction;
    /**
     * 提示内容
     * @default value
     */
    title?: string | ReactNode | RenderFunction;
    /**
     * 类名
     */
    className?: string;
    /**
     * 可视区宽度
     */
    maxWidth?: string | number;
    /**
     * 是否启用动态测量计算宽度。
     * true：通过测量计算判断文本是否溢出（支持 maxWidth/Tooltip 透传），并自动监听容器尺寸变化重测；
     * false（默认）：使用 antd Typography.Text 的 ellipsis 做轻量省略。
     */
    dynamic?: boolean;
    /**
     * antd Tooltip
     */
    [propName: string]: any;
}

const EllipsisText = (props: IEllipsisTextProps) => {
    const { dynamic = false } = props;

    if (dynamic) {
        // dynamic 仅用于上层分流，交给测量组件前剔除，避免透传到 Tooltip
        return <MeasureEllipsis {...(omit(props, ['dynamic']) as IEllipsisTextProps)} />;
    }

    const { value, title = value, className, maxWidth, ...restProps } = props;

    // maxWidth 仅 dynamic 分支生效，未开启时开发态提示
    if (maxWidth && process.env.NODE_ENV !== 'production') {
        console.warn(
            '[EllipsisText] `maxWidth` 仅在开启 `dynamic` 时生效；当前未传 `dynamic`，该参数将被忽略。'
        );
    }

    const content = typeof value === 'function' ? value() : value;
    const tooltipContent = typeof title === 'function' ? title() : title;

    // 其余 props 视为 Tooltip 配置透传，dynamic 剔除
    const tooltipProps = omit(restProps, ['dynamic']);

    return (
        <Typography.Text
            className={className}
            ellipsis={{ tooltip: { title: tooltipContent, ...tooltipProps } }}
        >
            {content}
        </Typography.Text>
    );
};

export default EllipsisText;
