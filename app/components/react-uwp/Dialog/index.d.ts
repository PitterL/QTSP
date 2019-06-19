import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../common/AddBlurEvent";
import RenderToBody from "../RenderToBody";
export interface DataProps {
    /**
     * Set Dialog show status.
     */
    defaultShow?: boolean;
    /**
     * If set true, click the mask background will not close dialog.
     */
    isControlled?: boolean;
    /**
     * Set custom content style.
     */
    contentStyle?: React.CSSProperties;
    /**
     * Set custom content enter style.
     */
    contentEnterStyle?: React.CSSProperties;
    /**
     * Set custom content leave style.
     */
    contentLeaveStyle?: React.CSSProperties;
    /**
     * Set onCloseDialog callback.
     */
    onCloseDialog?: () => void;
}
export interface DialogProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface DialogState {
    showDialog?: boolean;
}
export declare class Dialog extends React.Component<DialogProps, DialogState> {
    static defaultProps: DialogProps;
    state: DialogState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    renderToBody: RenderToBody;
    rootElm: HTMLDivElement;
    addBlurEvent: AddBlurEvent;
    componentWillReceiveProps(nextProps: DialogProps): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleShow: (showDialog?: boolean) => void;
    addBlurEventMethod: () => void;
    render(): JSX.Element;
}
export default Dialog;
