import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Set number of dots.
     */
    dotsNumber?: number;
    /**
     * Set ProgressRing size(px).
     */
    size?: number;
    /**
     * Set ProgressRing animate run once speed (2 loop).
     */
    speed?: number;
    /**
     * Set ProgressRing dots custom style.
     */
    dotsStyle?: React.CSSProperties;
}
export interface ProgressRingProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare class ProgressRing extends React.Component<ProgressRingProps> {
    static defaultProps: ProgressRingProps;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    getOnlyClassName: () => string;
    getCSSText: (className?: string) => string;
    render(): JSX.Element;
}
export default ProgressRing;
