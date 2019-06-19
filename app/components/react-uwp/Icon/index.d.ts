import * as React from "react";
import * as PropTypes from "prop-types";
declare const icons: {
    [key: string]: string;
};
export interface DataProps {
    /**
     * Set custom Icon size.
     */
    size?: number;
    /**
     * The Icon `onMouseEnter` will applied to `rootElm.style`.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * The Icon `onMouseDown` will applied to `rootElm.style`.
     */
    activeStyle?: React.CSSProperties;
    /**
     * `ReactNode`, Paste unicode or string or `IconName`.
     */
    children?: React.ReactNode;
    /**
     * if `true`, default `span` element will changed to `svg text` element.
     */
    useSVGElement?: boolean;
}
export interface IconProps extends DataProps, React.HTMLAttributes<HTMLSpanElement> {
}
export interface IconState {
    hovered?: boolean;
}
export declare class Icon extends React.Component<IconProps, IconState> {
    static defaultProps: IconProps;
    state: IconState;
    context: {
        theme: ReactUWP.ThemeType;
    };
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    handleMouseEnter: (e: React.MouseEvent<HTMLSpanElement>) => void;
    handleMouseLeave: (e: React.MouseEvent<HTMLSpanElement>) => void;
    render(): JSX.Element;
}
export { icons };
export default Icon;
