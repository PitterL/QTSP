import * as React from "react";
import * as PropTypes from "prop-types";
import MenuItem from "./MenuItem";
export { MenuItem };
export interface DataProps {
    /**
     * Set ReactNode to Menu item.
     */
    children?: React.ReactNode[] | any;
    /**
     * Set Menu Item width.
     */
    menuItemWidth?: number;
    /**
     * Set Menu Item height.
     */
    menuItemHeight?: number;
    /**
     * Set Menu Item hovered style.
     */
    menuItemHoverStyle?: React.CSSProperties;
    /**
     * Set Menu Item expanded method.
     */
    expandedMethod?: "active" | "hover";
}
export interface MenuItemProps {
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
    children?: MenuItem | MenuItem[];
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
export interface MenuProps extends DataProps, AnyAttributes {
}
export interface MenuState {
}
export declare class Menu extends React.Component<MenuProps, MenuState> {
    static defaultProps: MenuProps;
    state: MenuState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default Menu;
