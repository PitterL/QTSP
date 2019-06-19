import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../common/AddBlurEvent";
export interface DataProps {
    /**
     * Set icon to Menu Item.
     */
    icon?: string;
    /**
     * Set label text to Menu Item.
     */
    label?: string;
    /**
     * Set Menu Item nested children.
     */
    children?: MenuItem | MenuItem[] | React.ReactElement<any> | React.ReactElement<any>[];
    /**
     * Set default expanded children.
     */
    defaultExpanded?: boolean;
    /**
     * Set Menu Item width.
     */
    itemWidth?: number;
    /**
     * Set Menu Item height.
     */
    itemHeight?: number;
    /**
     * Set Menu Item hovered style.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * Set Menu Item expanded method.
     */
    expandedMethod?: "active" | "hover";
}
export interface AnyAttributes {
    [key: string]: any;
}
export interface MenuItemProps extends DataProps, AnyAttributes {
}
export interface MenuItemState {
    expanded?: boolean;
}
export declare class MenuItem extends React.Component<MenuItemProps, MenuItemState> {
    static defaultProps: MenuItemProps;
    state: MenuItemState;
    addBlurEvent: AddBlurEvent;
    rootElm: HTMLDivElement;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillReceiveProps(nextProps: MenuItemProps): void;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleExpanded: (expanded?: any) => void;
    render(): JSX.Element;
}
export default MenuItem;
