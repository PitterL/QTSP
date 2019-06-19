import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../common/AddBlurEvent";
import RenderToBody from "../RenderToBody";
export interface DataProps {
    /**
     * If set `statusBarTitle` to string, will render `StatusBar`.
     */
    statusBarTitle?: string;
    /**
     * default is `false`, is set close button show.
     */
    showCloseButton?: boolean;
    /**
     * ContentDialog `title`.
     */
    title?: string;
    /**
     * ContentDialog `content`.
     */
    content?: string;
    /**
     * ContentDialog `content Node`.
     */
    contentNode?: React.ReactNode;
    /**
     * primaryButton `text`.
     */
    primaryButtonText?: string;
    /**
     * secondaryButton `text`.
     */
    secondaryButtonText?: string;
    /**
     * controlled `ContentDialog` show.
     */
    defaultShow?: boolean;
    /**
     * closeButton `click callback`.
     */
    closeButtonAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * primaryButton `click callback`.
     */
    primaryButtonAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * secondaryButton `click callback`.
     */
    secondaryButtonAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * callback run end close dialog.
     */
    onCloseDialog?: () => void;
    /**
     * Set custom background.
     */
    background?: string;
    /**
     * Set ContentDialog inside padding.
     */
    padding?: number;
}
export interface ContentDialogProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ContentDialogState {
    showDialog?: boolean;
}
export declare class ContentDialog extends React.Component<ContentDialogProps, ContentDialogState> {
    static defaultProps: ContentDialogProps;
    state: ContentDialogState;
    addBlurEvent: AddBlurEvent;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    renderToBody: RenderToBody;
    rootElm: HTMLDivElement;
    shouldComponentUpdate(nextProps: ContentDialogProps, nextState: ContentDialogState): boolean;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    containerMouseEnterHandle: (e: React.MouseEvent<HTMLDivElement>) => void;
    containerMouseLeaveHandle: (e: React.MouseEvent<HTMLDivElement>) => void;
    closeDialog: () => void;
    render(): JSX.Element;
}
export default ContentDialog;
