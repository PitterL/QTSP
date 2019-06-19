import * as React from "react";
import * as PropTypes from "prop-types";
import CustomAnimate from "../Animate/CustomAnimate";
export interface DataProps {
    /**
     * Set custom Animate speed.
     */
    speed?: number;
    /**
     * Set component leave default style.
     */
    leaveStyle?: React.CSSProperties;
    /**
     * Set component enter default style.
     */
    enterStyle?: React.CSSProperties;
    /**
     * Set custom transitionTimingFunction.
     */
    transitionTimingFunction?: string;
    /**
     * Set custom children.
     */
    children?: React.ReactElement<any> | React.ReactElement<any>[];
    /**
     * Set scroll topOffset,, when `Element` top > topOffset, will animated.
     */
    topOffset?: number;
    /**
     * Set scroll bottomOffset,, when `Element` top + bottomOffset < window.innerHeight, will animated.
     */
    bottomOffset?: number;
    /**
     * Used a `span` wrapper element.
     */
    useWrapper?: boolean;
    /**
     * Set custom wrapper Style.
     */
    wrapperStyle?: React.CSSProperties;
}
export interface ScrollRevealProps extends DataProps {
    style?: React.CSSProperties;
}
export declare class ScrollReveal extends React.Component<ScrollRevealProps> {
    static defaultProps: ScrollRevealProps;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    customAnimate: CustomAnimate;
    rootElm: Element;
    animated: boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    setEnterStyle: () => void;
    setLeaveStyle: () => void;
    render(): JSX.Element;
}
export default ScrollReveal;
export { fadeInProps, scaleInProps, slideTopInProps, slideBottomInProps, slideLeftInProps, slideRightInProps } from "../Animate/CustomAnimate";
