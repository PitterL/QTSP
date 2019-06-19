import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * The FlyoutContent `verticalPosition`.
     */
    verticalPosition?: "top" | "bottom" | "center";
    /**
     * The FlyoutContent `horizontalPosition`.
     */
    horizontalPosition?: "left" | "right" | "center";
    /**
     * The default show FlyoutContent.
     */
    show?: boolean;
    /**
     * FlyoutContent margin `rootElm` position.
     */
    margin?: number;
    /**
     * Default is `false`, is `true` the Flyout component only show in `props.show === true`.
     */
    isControlled?: boolean;
    /**
     * After showed the flyout, auto hidden Flyout.
     */
    autoClose?: boolean;
    /**
     * Set `autoClose` timeout.
     */
    autoCloseTimeout?: number;
    /**
     * In `props.isControlled === false`, this will control `FlyoutContent` fade in timer.
     */
    enterDelay?: number;
}
export interface FlyoutContentProps extends DataProps, React.HTMLAttributes<HTMLSpanElement> {
}
export interface FlyoutContentState {
    showFlyoutContent?: boolean;
}
declare class FlyoutContent extends React.Component<FlyoutContentProps, FlyoutContentState> {
    static defaultProps: FlyoutContentProps;
    state: FlyoutContentState;
    rootElm: HTMLDivElement;
    autoHideTimer: any;
    hideTimer: any;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillReceiveProps(nextProps: FlyoutContentProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    showFlyoutContent: () => void;
    hideFlyoutContent: () => void;
    toggleShowFlyoutContent: (showFlyoutContent?: boolean) => void;
    getStaticStyle: (showFlyoutContent?: boolean) => React.CSSProperties;
    getDynamicStyle: (unit?: string) => React.CSSProperties;
    handelMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
    handelMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default FlyoutContent;
