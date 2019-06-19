import * as React from "react";
import * as PropTypes from "prop-types";
import Swipe from "../Swipe";
import Dots from "./Dots";
export interface DataProps {
    /**
     * default init Show item `children[initialFocusIndex]`.
     */
    initialFocusIndex?: number;
    /**
     * Control FlipView can Swipe or not.
     */
    stopSwipe?: boolean;
    /**
     * Control FlipView auto swipe.
     */
    autoSwipe?: boolean;
    /**
     * FlipView auto swipe speed.
     */
    speed?: number;
    /**
     * FlipView is phone mod swipe to next easier `0 < easy < 1`.
     */
    easy?: number;
    /**
     * FlipView layout.
     */
    direction?: "vertical" | "horizontal";
    /**
     * Control show FlipView navigation.
     */
    showNavigation?: boolean;
    /**
     * if `true`, remove `MouseEvent` control show navigation.
     */
    controlledNavigation?: boolean;
    /**
     * Control show FlipView control.
     */
    showControl?: boolean;
    /**
     * FlipView can drag in PC mode (in the experiment).
     */
    supportPcDrag?: boolean;
    /**
     * navigation `iconSize`.
     */
    navigationIconSize?: number;
}
export interface FlipViewProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface FlipViewState {
    focusSwipeIndex?: number;
    currCanAutoSwipe?: boolean;
    currShowNavigation?: boolean;
}
export declare class FlipView extends React.Component<FlipViewProps, FlipViewState> {
    static defaultProps: FlipViewProps;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    state: FlipViewState;
    mounted: boolean;
    rootElm: HTMLDivElement;
    swipe: Swipe;
    dots: Dots;
    swipeForward: () => void;
    swipeBackWord: () => void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: FlipViewProps, nextState: FlipViewState): boolean;
    handleChangeSwipe: (focusSwipeIndex: number) => void;
    toggleCanAutoSwipe: (currCanAutoSwipe?: any) => void;
    handleSwipeToIndex: (index: number) => void;
    handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default FlipView;
