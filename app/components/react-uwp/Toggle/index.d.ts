import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * The control Toggle `status`.
     */
    defaultToggled?: boolean;
    /**
     * onToggle `callback`.
     */
    onToggle?: (isOpen?: boolean) => void;
    /**
     * Set custom size, Refer to the `height` of the component.
     */
    size?: number;
    /**
     * Set custom `label text`.
     */
    label?: string;
    /**
     * Set custom Toggle `background`.
     */
    background?: string;
    checked?: boolean;
}
export interface ToggleProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ToggleState {
    currToggled?: boolean;
}
export declare class Toggle extends React.Component<ToggleProps, ToggleState> {
    static defaultProps: ToggleProps;
    state: ToggleState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillReceiveProps(nextProps: ToggleProps): void;
    toggleToggle: (currToggled?: any) => void;
    render(): JSX.Element;
}
export default Toggle;
