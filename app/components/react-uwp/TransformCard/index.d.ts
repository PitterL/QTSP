import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Set Car perspective.
     */
    perspective?: string | number;
    /**
     * Set the x rotate max deg.
     */
    xMaxRotate?: number;
    /**
     * Set the y rotate max deg.
     */
    yMaxRotate?: number;
    /**
     * Set the default rotateX.
     */
    defaultRotateX?: number;
    /**
     * Set the default rotateY.
     */
    defaultRotateY?: number;
    /**
     * Set mouse leave transition speed.
     */
    leaveSpeed?: number;
    /**
     * Set mouse leave transition TimingFunction.
     */
    leaveTimingFunction?: string;
}
export interface TransformCardProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface TransformCardState {
    isEnter?: boolean;
}
export declare class TransformCard extends React.Component<TransformCardProps, TransformCardState> {
    static defaultProps: TransformCardProps;
    state: TransformCardState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    wrapperElm: HTMLDivElement;
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default TransformCard;
