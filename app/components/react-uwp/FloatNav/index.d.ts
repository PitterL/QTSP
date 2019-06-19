import * as React from "react";
import * as PropTypes from "prop-types";
export interface ExpandedItem {
    /**
     * Set ReactNode to item.
     */
    iconNode?: React.ReactElement<any>;
    /**
     * Set title to item.
     */
    title?: string;
    /**
     * onClick callback.
     */
    onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
    /**
     * Set focus focus color to item.
     */
    href?: string;
    /**
     * Set focus focus color to item.
     */
    focusColor?: string;
}
export interface DataProps {
    /**
     * Set Float expanded position.
     */
    isFloatRight?: boolean;
    /**
     * Set custom default width.
     */
    initWidth?: number;
    /**
     * Set custom expanded width.
     */
    expandedWidth?: number;
    /**
     * Set custom ReactNode to top.
     */
    topNode?: React.ReactElement<any> | React.ReactElement<any>[];
    /**
     * Set custom ReactNode to Bottom.
     */
    bottomNode?: React.ReactElement<any> | React.ReactElement<any>[];
    /**
     * Set custom expanded items.
     */
    expandedItems?: ExpandedItem[];
    /**
     * HightLight expanded item ny index.
     */
    focusItemIndex?: number;
    /**
     * HightLight expanded item ny index.
     */
    onFocusItem?: (itemIndex?: number) => void;
}
export interface FloatNavProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface FloatNavState {
    currFocusItemIndex?: number;
    hoverItem?: number;
    hoverIndexArray?: boolean[];
}
export declare class FloatNav extends React.Component<FloatNavProps, FloatNavState> {
    static defaultProps: FloatNavProps;
    state: FloatNavState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillReceiveProps(nextProps: FloatNavProps): void;
    shouldComponentUpdate(nextProps: FloatNavProps, nextState: FloatNavState): boolean;
    focusIndex: (currFocusItemIndex: number) => void;
    getFocusIndex: () => number;
    getItems: () => ExpandedItem[];
    render(): JSX.Element;
}
export default FloatNav;
