export interface NewHTMLElement extends HTMLElement {
    currentStyle?: CSSStyleDeclaration;
}
type Nullable<T> = T | undefined | null;

export const MIN_WIDTH = 0;
export const DEFAULT_MAX_WIDTH = 120;

/**
 * @description: 根据属性名，获取 dom 的属性值
 * @param {NewHTMLElement} dom
 * @param {string} attr
 * @return {*}
 */
export const getStyle = (dom: Nullable<NewHTMLElement>, attr: string) => {
    if (!dom) {
        return null;
    }
    // Compatible width IE8
    // @ts-ignore
    return window.getComputedStyle(dom)?.[attr] || dom.currentStyle?.[attr];
};

/**
 * @description: 根据属性名，获取dom的属性值为number的属性。如： height、width。。。
 * @param {NewHTMLElement} dom
 * @param {string} attr
 * @return {*}
 */
export const getNumTypeStyleValue = (dom: NewHTMLElement, attr: string) => {
    return parseInt(getStyle(dom, attr));
};

/**
 * @description: 10 -> 10,
 * @description: 10px -> 10,
 * @description: 90% -> ele.width * 0.9
 * @description: calc(100% - 32px) -> ele.width - 32
 * @param {*} ele
 * @param {string & number} maxWidth
 * @return {*}
 */
export const transitionWidth = (ele: HTMLElement, maxWidth: string | number) => {
    const eleWidth = getActualWidth(ele);

    if (typeof maxWidth === 'number') {
        return maxWidth > eleWidth ? eleWidth : maxWidth; // 如果父元素的宽度小于传入的最大宽度，返回父元素的宽度
    }

    const numMatch = maxWidth.match(/^(\d+)(px)?$/);
    if (numMatch) {
        return +numMatch[1] > eleWidth ? eleWidth : +numMatch[1]; // 如果父元素的宽度小于传入的最大宽度，返回父元素的宽度
    }

    const percentMatch = maxWidth.match(/^(\d+)%$/);
    if (percentMatch) {
        return eleWidth * (parseInt(percentMatch[1]) / 100);
    }

    const relativeMatch = maxWidth.match(/^calc\(100% - (\d+)px\)$/);
    if (relativeMatch) {
        return eleWidth - parseInt(relativeMatch[1]);
    }

    return eleWidth;
};

/**
 * @description: 获取 dom 元素的内容宽度
 * @param {HTMLElement} ele
 * @return {*}
 */
export const getRangeWidth = (ele: HTMLElement): number => {
    const range = document.createRange();
    range.selectNodeContents(ele);
    const rangeWidth = range.getBoundingClientRect().width;

    return rangeWidth;
};

/**
 * @description: 获取元素不包括 padding 的宽度
 * @param {HTMLElement} ele
 * @return {*}
 */
export const getActualWidth = (ele: HTMLElement) => {
    /**
     * 优先使用 getBoundingClientRect().width 获取精确的渲染宽度；
     * 当其为 0 时回退用 offsetWidth 兜底。getBoundingClientRect 会反映 CSS transform，
     * 而 offsetWidth 不会——因此在 Select 下拉展开/收起的 transform 收缩动画期间
     * （rect 被缩放为 0、元素仍占据布局宽度）能兜底取到真实宽度。
     * 注意：display:none 时 offsetWidth 同样为 0，该兜底对此场景无效。
     */
    const rectWidth = ele.getBoundingClientRect().width;
    const width = rectWidth > 0 ? rectWidth : ele.offsetWidth;
    const paddingLeft = getNumTypeStyleValue(ele, 'paddingLeft');
    const paddingRight = getNumTypeStyleValue(ele, 'paddingRight');

    return width - paddingLeft - paddingRight;
};

/**
 * @description: 获取 dom 的可用宽度
 * @param {HTMLElement} ele
 * @return {*}
 */
export const getAvailableWidth = (ele: HTMLElement) => {
    const width = getActualWidth(ele);
    const contentWidth = getRangeWidth(ele);
    const ellipsisWidth = width - contentWidth;

    return ellipsisWidth;
};

/**
 * @description 获取/向上获取有效的父元素（非行内元素）
 * @param {Nullable<HTMLElement>} ele
 * @returns {Nullable<HTMLElement>}
 */
export const getValidContainerElement = (ele: Nullable<HTMLElement>): Nullable<HTMLElement> => {
    if (!ele) return ele;

    const { scrollWidth, parentElement } = ele;

    // 如果是行内元素，获取不到宽度，则向上寻找父元素
    if (scrollWidth === 0) {
        return getValidContainerElement(parentElement!);
    }

    return ele;
};

/**
 * @description: 计算容纳文本的容器宽度，结果会做 MIN_WIDTH 下限钳制
 * @param {HTMLElement} textNode 文本节点（测量期间会临时隐藏，避免影响父元素宽度计算）
 * @param {Nullable<string | number>} maxWidth 传入的最大宽度，缺省时按父元素可用宽度测量
 * @return {number}
 */
export const getTextContainerWidth = (
    textNode: HTMLElement,
    maxWidth?: string | number
): number => {
    const container = getValidContainerElement(textNode.parentElement);

    if (!container) return DEFAULT_MAX_WIDTH;

    let containerWidth: number;

    if (maxWidth) {
        containerWidth = transitionWidth(container, maxWidth);
    } else {
        // 获取 ref 元素占的宽度前，需要把 ref 元素隐藏，以免影响父级宽度计算
        textNode.style.display = 'none';
        containerWidth = getAvailableWidth(container);
        textNode.style.display = 'inline-block';
    }

    return Math.max(MIN_WIDTH, containerWidth);
};

/**
 * @description: 解析容器应使用的 cursor。优先继承父元素手势；
 * 父元素为默认手势且文本溢出时切换为 pointer
 * @param {Nullable<string>} parentCursor 父元素 cursor
 * @param {boolean} isOverflow 文本是否溢出
 * @return {string}
 */
export const getEllipsisCursorStyle = (
    parentCursor: string | null,
    isOverflow: boolean
): string => {
    if (parentCursor && parentCursor !== 'default') return parentCursor;

    return isOverflow ? 'pointer' : 'default';
};
