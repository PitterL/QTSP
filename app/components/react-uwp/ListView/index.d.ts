import * as React from "react";
import * as PropTypes from "prop-types";
export interface ListItem {
    itemNode?: React.ReactNode;
    disabled?: boolean;
    focus?: boolean;
    style?: React.CSSProperties;
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}
export interface DataProps {
    /**
     * ListSource Data.
     */
    listSource?: ListItem[] | React.ReactNode[];
    /**
     * `listItemStyle` will applied to all listItem.
     */
    listItemStyle?: React.CSSProperties;
    /**
     * onChoose ListItem `callback`.
     */
    onChooseItem?: (itemIndex?: number) => void;
    /**
     * default focus List Item by `Index`.
     */
    defaultFocusListIndex?: number;
    /**
     * Set Custom Background.
     */
    background?: string;
}
export interface ListViewProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ListViewState {
    focusIndex?: number;
}
export declare class ListView extends React.Component<ListViewProps, ListViewState> {
    static defaultProps: ListViewProps;
    state: ListViewState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    rootElm: HTMLDivElement;
    inlineStyles: {
        [key: string]: React.CSSProperties;
    };
    componentWillReceiveProps(nextProps: ListViewProps): void;
    getItemNode: (itemNode: any, index: number, disabled?: boolean, focus?: boolean, style?: React.CSSProperties, onClick?: () => void) => JSX.Element;
    render(): JSX.Element;
}
export default ListView;
