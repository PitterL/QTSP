import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../common/AddBlurEvent";
export interface DataProps {
    /**
     * Root Container Style.
     */
    contentStyle?: React.CSSProperties;
    /**
     * CommandBar title.
     */
    content?: string;
    /**
     * CommandBar title node, if just string, can use `content`.
     */
    contentNode?: React.ReactNode;
    /**
     * `PrimaryCommands`, if item `type` is not `AppBarButton` or `AppBarButton`, will not render.
     */
    primaryCommands?: React.ReactElement<any>[];
    /**
     * `SecondaryCommands`, if item `type` is not `AppBarButton` or `AppBarButton`, will not render.
     */
    secondaryCommands?: React.ReactElement<any>[];
    /**
     * control `AppBarButton` label position.
     */
    labelPosition?: "right" | "bottom" | "collapsed";
    /**
     * if using `labelPosition` "bottom", this will control default open status.
     */
    expanded?: boolean;
    /**
     * `CommandBar` layout.
     */
    flowDirection?: "row-reverse" | "row";
    /**
     * set CommandBar to `minimal` size.
     */
    isMinimal?: boolean;
    /**
     * default is `top`, set `bottom` if your `CommandBar` in your app's bottom.
     */
    verticalPosition?: "top" | "bottom";
    /**
     * Set custom background.
     */
    background?: string;
}
export interface CommandBarProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface CommandBarState {
    currExpanded?: boolean;
}
export declare class CommandBar extends React.Component<CommandBarProps, CommandBarState> {
    static defaultProps: CommandBarProps;
    state: CommandBarState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    rootElm: HTMLDivElement;
    addBlurEvent: AddBlurEvent;
    componentWillReceiveProps(nextProps: CommandBarProps): void;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleExpanded: (currExpanded?: any) => void;
    render(): JSX.Element;
}
export default CommandBar;
