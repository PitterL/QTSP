import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Control show how much `Rating`.
     */
    defaultRating?: number;
    /**
     * Control show `Rating` size.
     */
    maxRating?: number;
    /**
     * Control show custom `Icon`.
     */
    icon?: string;
    /**
     * Control custom `Icon Style`.
     */
    iconStyle?: React.CSSProperties;
    /**
     * Control custom `Icon Rated Style`.
     */
    iconRatedStyle?: React.CSSProperties;
    /**
     * `onChange` Rating call back.
     */
    onChangeRating?: (rating?: number) => void;
    /**
     * Control show custom label.
     */
    label?: string;
    /**
     * Control Rating is can't be modified.
     */
    isReadOnly?: boolean;
    /**
     * Set each ratings padding size.(px)
     */
    iconPadding?: number;
}
export interface RatingControlProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface RatingControlState {
    currRating?: number;
}
export declare class RatingControl extends React.Component<RatingControlProps, RatingControlState> {
    static defaultProps: RatingControlProps;
    rootElm: HTMLDivElement;
    state: RatingControlState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillReceiveProps(nextProps: RatingControlProps): void;
    handleRationClick: (e: React.MouseEvent<HTMLSpanElement>, index: number) => void;
    render(): JSX.Element;
}
export default RatingControl;
