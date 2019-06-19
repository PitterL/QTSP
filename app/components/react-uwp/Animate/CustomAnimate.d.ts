import * as React from "react";
import * as PropTypes from "prop-types";
import CustomAnimateChild from "./CustomAnimateChild";
export interface DataProps {
    /**
     * If true, animate in end component `componentDidAppear`.
     */
    appearAnimate?: boolean;
    /**
     * Set component animate mode, if `in`, animate just run on component end in.
     */
    mode?: "in" | "out" | "in-out";
    /**
     * Set component leave style.
     */
    leaveStyle?: React.CSSProperties;
    /**
     * Set component enter style.
     */
    enterStyle?: React.CSSProperties;
    /**
     * Set animation speed.
     */
    speed?: number;
    /**
     * Set transitionTimingFunction for animation.
     */
    transitionTimingFunction?: string;
    /**
     * Set animate `enter` delay.
     */
    enterDelay?: number;
    /**
     * Set animate `leave` delay.
     */
    leaveDelay?: number;
    /**
     * Set wrapper component.
     */
    component?: any;
    /**
     * Add `Wrapper` element for component.
     */
    useWrapper?: boolean;
    /**
     * set `Wrapper` element style.
     */
    wrapperStyle?: React.CSSProperties;
    /**
     * set to root element style.
     */
    style?: React.CSSProperties;
}
export interface CustomAnimateProps extends DataProps {
}
export declare class CustomAnimate extends React.Component<CustomAnimateProps> {
    static defaultProps: CustomAnimateProps;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    customAnimateChildArray: CustomAnimateChild[];
    setLeaveStyle: () => void;
    setEnterStyle: () => void;
    render(): JSX.Element;
}
declare const slideBottomInProps: CustomAnimateProps;
declare const slideTopInProps: CustomAnimateProps;
declare const slideLeftInProps: CustomAnimateProps;
declare const slideRightInProps: CustomAnimateProps;
declare const scaleInProps: CustomAnimateProps;
declare const fadeInProps: CustomAnimateProps;
export { fadeInProps, scaleInProps, slideTopInProps, slideBottomInProps, slideLeftInProps, slideRightInProps };
export default CustomAnimate;
