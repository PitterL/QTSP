import * as React from "react";
import * as PropTypes from "prop-types";
import CustomAnimate from "../Animate/CustomAnimate";
export interface DataProps {
    /**
     * Set default show Toast.
     */
    defaultShow?: boolean;
    /**
     * Set custom `logo` with `ReactNode`.
     */
    logoNode?: React.ReactNode;
    /**
     * Set Toast title.
     */
    title?: string;
    /**
     * Set Toast description.
     */
    description?: string | string[];
    /**
     * Set Toast close after showed timeout.
     */
    closeDelay?: number;
    /**
     * Set onChange show Toast status `callback`.
     */
    onToggleShowToast?: (showToast?: boolean) => void;
    /**
     * Toggle show close `Icon`.
     */
    showCloseIcon?: boolean;
}
export interface ToastProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
    key?: any;
}
export interface ToastState {
    showToast?: boolean;
}
export declare class Toast extends React.Component<ToastProps, ToastState> {
    static defaultProps: ToastProps;
    state: ToastState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    toastId: number;
    hiddenTimer: any;
    closeTimer: any;
    customAnimate: CustomAnimate;
    customAnimateElm: HTMLDivElement;
    componentWillReceiveProps(nextProps: ToastProps): void;
    componentDidMount(): void;
    addCloseDelay: () => void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleShowToast: (showToast?: any) => void;
    trueRender: () => JSX.Element;
    render(): any;
}
export default Toast;
