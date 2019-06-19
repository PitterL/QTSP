import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Set Tooltip content.
     */
    content?: string;
    /**
     * Set ReactNode to replace content.
     */
    contentNode?: React.ReactNode;
    /**
     * Set Tooltip custom vertical position.
     */
    verticalPosition?: "top" | "bottom" | "center";
    /**
     * Set Tooltip custom horizontal position.
     */
    horizontalPosition?: "left" | "right" | "center";
    /**
     * Set Tooltip custom margin from `rootElm` (px).
     */
    margin?: number;
    /**
     * Set Tooltip auto close in showed some time.
     */
    autoClose?: boolean;
    /**
     * Set Tooltip auto close time (ms).
     */
    autoCloseTimeout?: number;
    /**
     * Set close delay time (ms).
     */
    closeDelay?: number;
    /**
     * Set custom background.
     */
    background?: string;
}
export interface TooltipProps extends DataProps, React.HTMLAttributes<HTMLSpanElement> {
}
export interface TooltipState {
    showTooltip?: boolean;
}
export declare class Tooltip extends React.Component<TooltipProps, TooltipState> {
    static defaultProps: TooltipProps;
    state: TooltipState;
    rootElm: HTMLDivElement;
    tooltipElm: HTMLSpanElement;
    timer: any;
    unShowTimer: any;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillUnmount(): void;
    showTooltip: (e: React.MouseEvent<HTMLDivElement>) => void;
    unShowTooltip: (e: React.MouseEvent<HTMLDivElement>) => void;
    getStyle: (showTooltip?: boolean, positionStyle?: {}) => React.CSSProperties;
    getTooltipStyle: () => React.CSSProperties;
    render(): JSX.Element;
}
export default Tooltip;
