---
title: EllipsisText 长文本省略显示
group: 组件
toc: content
demo:
    cols: 2
---

# EllipsisText 长文本省略显示

## 何时使用

用于长文本省略。默认使用 antd `Typography.Text` 的 `ellipsis` 做轻量省略并悬停展示完整内容；当需要精确计算宽度（如 `maxWidth` 传字符串/百分比/`calc(100% - x px)`，或处于 flex / Select 等容器场景）时，通过 `dynamic` 开关开启动态测量，并自动监听容器尺寸变化重新计算。

## 注意

-   默认（不传 `dynamic`）走 `Typography.Text` 分支，性能更优、无需测量。
-   开启 `dynamic` 后，宽度的计算是一个比较耗时的动作，同一页面内该组件使用次数保持在 100 个以内，如果存在性能问题，考虑先支持虚拟滚动等技术后，在使用该组件。

## 示例

<code src="./demos/basic.tsx" title="基础使用" description="请更改窗口大小"></code>
<code src="./demos/dynamic.tsx" title="dynamic 开关" description="对比默认与动态测量两种模式：默认使用 antd Typography.Text 做轻量省略；开启 dynamic 后走动态测量，额外支持 maxWidth 精确限宽（滑块仅 dynamic 生效）。更多场景见下方示例"></code>
<code src="./demos/valueType.tsx" title="支持 ReactNode" description="只支持返回的 dom 为行内元素"></code>
<code src="./demos/inlineElement.tsx" title="在行内元素中使用" description="行内元素无法获得宽度，在计算时会不断向上查找，直到找到一个能够正确获取宽度的父元素，并以找到父元素宽度当作文本的可视宽度"></code>
<code src="./demos/flex.tsx" title="在 flex 中使用" description="请更改窗口大小"></code>
<code src="./demos/maxWidth.tsx" title="宽度限制"></code>
<code src="./demos/multiple.tsx" title="同一容器多个 EllipsisText 组件" description="都必须传入 maxWidth"></code>
<code src="./demos/select.tsx" title="在 Select 中省略显示" description="下拉选项异步渲染且带展开动画（宽度会从 0 变化），需开启 dynamic 动态测量宽度"></code>

## API

| 参数      | 说明                                                                                                                                      | 类型                             | 默认值 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------ |
| value     | 显示文本内容                                                                                                                              | `ReactNode   \| () => ReactNode` | -      |
| title     | 提示文字                                                                                                                                  | `ReactNode   \| () => ReactNode` | value  |
| className | 为文本内容所在节点添加自定义样式名                                                                                                        | `string`                         | -      |
| dynamic   | 是否开启动态测量计算宽度。true 时支持 `maxWidth`/Tooltip 透传，并自动监听容器尺寸变化重测；false 时使用 antd `Typography.Text` 做轻量省略 | `boolean`                        | false  |
| maxWidth  | 文本内容的最大宽度(仅 `dynamic` 时生效)                                                                                                   | `string \| number`               | -      |

:::info
其余参数继承自 [继承 antd4.x 的 Tooltip](https://4x.ant.design/components/tooltip-cn/#API)
:::
