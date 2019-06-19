import * as React from "react";
import * as PropTypes from "prop-types";
export interface TreeItem {
    /**
     * Set TreeView item title.
     */
    title?: string;
    /**
     * Set TreeView ReactNode to item title.
     */
    titleNode?: React.ReactNode;
    /**
     * Disabled TreeView item.
     */
    disabled?: boolean;
    /**
     * Init Item is `Visited`,only effective for the first loaded.
     */
    visited?: boolean;
    /**
     * Set Item is expanded.
     */
    expanded?: boolean;
    /**
     * Init Item is `Focus`,only effective for the first loaded.
     */
    focus?: boolean;
    /**
     * Hidden TreeView item.
     */
    hidden?: boolean;
    /**
     * Set TreeView Children.
     */
    children?: TreeItem[];
    /**
     * Set TreeView item init style.
     */
    style?: React.CSSProperties;
    /**
     * Set TreeView item hovered style.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * Set TreeView item onclick callback.
     */
    onClick?: (e: MouseEvent) => void;
}
export interface DataProps {
    /**
     * Set TreView data source.
     */
    listSource?: TreeItem[] | string[];
    /**
     * Set TreView icon direction.
     */
    iconDirection?: "left" | "right";
    /**
     * Set TreView item height.
     */
    itemHeight?: number;
    /**
     * Set TreView item padding.
     */
    itemPadding?: number;
    /**
     * Set TreView icon padding.
     */
    iconPadding?: number;
    /**
     * onChoose Tree item callback.
     */
    onChooseTreeItem?: (listItem: TreeItem) => void;
    /**
     * Set Tree header item icon.
     */
    headerIcon?: React.ReactNode;
    /**
     * Set Tree item children icon.
     */
    itemIcon?: React.ReactNode;
    /**
     * Set TreeView custom background.
     */
    background?: string;
    /**
     * Set first loaded show focus item ro not.
     */
    showFocus?: boolean;
}
export interface TreeViewProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface TreeViewState {
    init?: boolean;
    chooseTreeItem?: TreeItem;
}
export declare class TreeView extends React.Component<TreeViewProps, TreeViewState> {
    static defaultProps: TreeViewProps;
    state: TreeViewState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    setChooseItem: (chooseTreeItem: TreeItem) => void;
    renderTree: () => React.ReactNode;
    render(): JSX.Element;
}
export default TreeView;
