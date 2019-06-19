import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Control `Button` border size.
     */
    borderSize?: string;
    /**
     * Is onMouseEnter Inline Style will assign to default `hoverStyle`.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * Is onMouseDown Inline Style will assign to default `hoverStyle`.
     */
    activeStyle?: React.CSSProperties;
    /**
     * icon use the Iconfont like `\uE00A` or iconName `HeartLegacy`.
     */
    icon?: string;
    /**
     * This will assign to default `iconStyle`.
     */
    iconStyle?: React.CSSProperties;
    /**
     * will change to icon position, default is `left`.
     */
    iconPosition?: "left" | "right";
    /**
     * if `true`, will become `Disabled Button`.
     */
    disabled?: boolean;
    /**
     * `tooltip` is any type, you can passe a `React.Element` or `string`.
     */
    tooltip?: React.ReactElement<any> | string;
    /**
     * Set custom Button `background`.
     */
    background?: string;
}
export interface ButtonProps extends DataProps, React.HTMLAttributes<HTMLButtonElement> {
}
export declare class Button extends React.Component<ButtonProps> {
    static defaultProps: ButtonProps;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    refs: {
        container: HTMLButtonElement;
    };
    render(): JSX.Element;
}
export default Button;
