import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import useEllipsisTextStyle from '../useEllipsisTextStyle';
import { getRangeWidth, getStyle, getTextContainerWidth } from '../utils';

jest.mock('../utils', () => {
    const actual = jest.requireActual('../utils');
    return {
        ...actual,
        getValidContainerElement: jest.fn(),
        getRangeWidth: jest.fn(),
        getStyle: jest.fn(),
        getTextContainerWidth: jest.fn(),
    };
});

describe('Test useEllipsisTextStyle', () => {
    const mockGetRangeWidth = getRangeWidth as jest.Mock;
    const mockGetStyle = getStyle as jest.Mock;
    const mockGetTextContainerWidth = getTextContainerWidth as jest.Mock;

    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('should return a ref, overflow state, style, and trigger function', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text'));
        const [ref, isOverflow, style, updateTextStyle] = result.current;

        expect(ref).toBeInstanceOf(Object);
        expect(typeof isOverflow).toBe('boolean');
        expect(style).toBeInstanceOf(Object);
        expect(typeof updateTextStyle).toBe('function');
    });

    it('should calculate overflow correctly', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text'));
        const [ref, , , updateTextStyle] = result.current;

        render(<span ref={ref}></span>);

        mockGetRangeWidth.mockReturnValue(150);
        mockGetTextContainerWidth.mockReturnValue(100);

        act(() => {
            updateTextStyle();
        });

        const [, isOverflow, style] = result.current;

        expect(mockGetTextContainerWidth).toHaveBeenCalled();
        expect(isOverflow).toBe(true);
        expect(style.maxWidth).toBe(100);
    });

    it('should not overflow if the container width is sufficient', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text'));
        const [ref, , , updateTextStyle] = result.current;

        render(<span ref={ref}></span>);

        mockGetRangeWidth.mockReturnValue(80);
        mockGetTextContainerWidth.mockReturnValue(100);

        act(() => {
            updateTextStyle();
        });
        const [, isOverflow, style] = result.current;

        expect(isOverflow).toBe(false);
        expect(style.maxWidth).toBe(100);
    });

    it('should inherit cursor style from parent', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text'));
        const [ref, , , updateTextStyle] = result.current;

        render(<span ref={ref}></span>);

        mockGetTextContainerWidth.mockReturnValue(100);
        mockGetStyle.mockReturnValue('pointer');

        act(() => {
            updateTextStyle();
        });
        const [, , style] = result.current;

        expect(style.cursor).toBe('pointer');
    });

    it('should have cursor style as default when text is not overflowing and parent cursor is default', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text'));
        const [ref, , , updateTextStyle] = result.current;

        render(<span ref={ref}></span>);

        mockGetRangeWidth.mockReturnValue(80);
        mockGetTextContainerWidth.mockReturnValue(100);
        mockGetStyle.mockReturnValue('default');

        act(() => {
            updateTextStyle();
        });
        const [, isOverflow, style] = result.current;

        expect(isOverflow).toBe(false);
        expect(style.cursor).toBe('default');
    });

    it('should have cursor style as pointer when text is overflowing and parent cursor is default', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text'));
        const [ref, , , updateTextStyle] = result.current;

        render(<span ref={ref}></span>);

        mockGetRangeWidth.mockReturnValue(150);
        mockGetTextContainerWidth.mockReturnValue(100);
        mockGetStyle.mockReturnValue('default');

        act(() => {
            updateTextStyle();
        });
        const [, isOverflow, style] = result.current;

        expect(isOverflow).toBe(true);
        expect(style.cursor).toBe('pointer');
    });

    it('should set container width when container width < maxWidth', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text', 120));
        const [ref, , , updateTextStyle] = result.current;

        render(<span ref={ref}></span>);

        mockGetTextContainerWidth.mockReturnValue(100);

        act(() => {
            updateTextStyle();
        });
        const [, , style] = result.current;

        expect(style.maxWidth).toBe(100);
    });

    it('should set maxWidth when container width > maxWidth ', () => {
        const { result } = renderHook(() => useEllipsisTextStyle('Test Text', 80));
        const [ref, , , updateTextStyle] = result.current;

        render(<span ref={ref}></span>);

        mockGetTextContainerWidth.mockReturnValue(80);

        act(() => {
            updateTextStyle();
        });
        const [, , style] = result.current;

        expect(style.maxWidth).toBe(80);
    });
});
