import * as React from "react";
import * as PropTypes from "prop-types";
import Tab, { DataProps as TabProps } from "./Tab";
export { Tab, TabProps };
export interface DataProps {
    /**
     * Set custom focus tab by index.
     */
    defaultFocusTabIndex?: number;
    /**
     * Set custom tab title style.
     */
    tabTitleStyle?: React.CSSProperties;
    /**
     * Set custom focused tab title style.
     */
    tabTitleFocusStyle?: React.CSSProperties;
    /**
     * Set every `Tab` style.
     */
    tabStyle?: React.CSSProperties;
    /**
     * Custom set render `Tab Title` method.
     */
    renderTitle?: (title?: string) => React.ReactNode;
    /**
     * If true, will add animate to tabs in out.
     */
    useAnimate?: boolean;
    /**
     * Set tabs animate mode.
     */
    animateMode?: "in" | "out" | "in-out";
    /**
     * Set tabs animate speed.
     */
    animateSpeed?: number;
    /**
     * Set tab animate enter style.
     */
    animateEnterStyle?: React.CSSProperties;
    /**
     * Set tab animate leave style.
     */
    animateLeaveStyle?: React.CSSProperties;
}
export interface TabsProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface TabsState {
    tabFocusIndex?: number;
}
export declare class Tabs extends React.Component<TabsProps, TabsState> {
    static defaultProps: TabsProps;
    state: TabsState;
    componentWillReceiveProps(nextProps: TabsProps): void;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default Tabs;
