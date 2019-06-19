import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * The IconButton `onMouseEnter` will applied to `rootElm.style`.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * The IconButton `onMouseDown` will applied to `rootElm.style`.
     */
    activeStyle?: React.CSSProperties;
    /**
     * The control IconButton size.
     */
    size?: number;
    /**
     * The control IconButton disabled.
     */
    disabled?: boolean;
}
export interface IconButtonProps extends DataProps, React.HTMLAttributes<HTMLButtonElement> {
}
export declare class IconButton extends React.Component<IconButtonProps> {
    static defaultProps: IconButtonProps;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default IconButton;
