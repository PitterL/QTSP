import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../common/AddBlurEvent";
import SplitViewCommand from "../SplitViewCommand";
export { SplitViewCommand };
export interface NavigationComplexNode {
    default?: React.ReactNode;
    expanded?: React.ReactNode;
}
export declare type NavigationNode = SplitViewCommand | React.ReactNode;
export interface DataProps {
    /**
     * Set Navigation background.
     */
    background?: string;
    /**
     * Set Navigation width.
     */
    initWidth?: number;
    /**
     * Set Navigation expanded width.
     */
    expandedWidth?: number;
    /**
     * Control Navigation expanded.
     */
    defaultExpanded?: boolean;
    /**
     * Replace TopIcon, default is NavButton.
     */
    topIcon?: React.ReactElement<any>;
    /**
     * Set NavigationView to controlled component.
     */
    isControlled?: boolean;
    /**
     * Normal usage `SplitViewCommand[]`, different status use `{ default?: React.ReactNode, expanded?: React.ReactNode }`.
     */
    navigationTopNodes?: Array<NavigationNode | NavigationComplexNode>;
    /**
     * Normal usage `SplitViewCommand[]`, different status use `{ default?: React.ReactNode, expanded?: React.ReactNode }`.
     */
    navigationBottomNodes?: Array<NavigationNode | NavigationComplexNode>;
    /**
     * Three display control Navigation show mode.
     */
    displayMode?: "overlay" | "compact" | "minimal";
    /**
     * The page title.
     */
    pageTitle?: string;
    /**
     * The pane view style.
     */
    paneStyle?: React.CSSProperties;
    /**
     * Usage TenFt Mode.
     */
    isTenFt?: boolean;
    /**
     * Auto change mode by window `onResize`.
     */
    autoResize?: boolean;
    /**
     * Default focus `SplitViewCommand` item by `index`.
     */
    focusNavigationNodeIndex?: number;
}
export interface NavigationViewProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface NavigationViewState {
    expanded?: boolean;
    focusNodeIndex?: number;
    currDisplayMode?: "overlay" | "compact" | "minimal";
    currInitWidth?: number;
}
export declare class NavigationView extends React.Component<NavigationViewProps, NavigationViewState> {
    static defaultProps: NavigationViewProps;
    state: NavigationViewState;
    addBlurEvent: AddBlurEvent;
    paneElm: HTMLDivElement;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillMount(): void;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: NavigationViewProps, nextState: NavigationViewState, nextContext: {
        theme: ReactUWP.ThemeType;
    }): boolean;
    componentWillUnmount(): void;
    autoResize: (e?: Event) => void;
    updateProps2State: ({ defaultExpanded }: NavigationViewProps) => void;
    toggleExpanded: (expanded?: boolean) => void;
    getNewNodeProps: (currNode: any, index: number, expanded?: boolean, haveExpandedNode?: boolean) => any;
    render(): JSX.Element;
}
export default NavigationView;
