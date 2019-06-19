import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Set progress value. `(0 <= value <=1)`
     */
    defaultProgressValue?: number;
    /**
     * Set ProgressBar to indeterminate model.
     */
    isIndeterminate?: boolean;
    /**
     * Set ProgressBar width.
     */
    barWidth?: number;
    /**
     * Set ProgressBar height.
     */
    barHeight?: number;
    /**
     * Set ProgressBar animation speed.
     */
    speed?: number;
}
export interface ProgressBarProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ProgressBarState {
}
export declare class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {
    static defaultProps: ProgressBarProps;
    state: ProgressBarState;
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
export default ProgressBar;
