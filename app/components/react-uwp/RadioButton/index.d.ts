import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Default checked status.
     */
    defaultChecked?: true | false;
    /**
     * `Disabled` the RadioButton.
     */
    disabled?: boolean;
    /**
     * `onCheck` call back.
     */
    onCheck?: (currChecked?: boolean) => void;
    /**
     * Control RadioButton `RadioButton`.
     */
    size?: number;
    /**
     * Set RadioButton `label`.
     */
    label?: string;
}
export interface RadioButtonProps extends DataProps, React.HTMLAttributes<HTMLSpanElement> {
}
export interface RadioButtonState {
    currChecked?: boolean;
    hovered?: boolean;
}
export declare class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
    static defaultProps: RadioButtonProps;
    state: RadioButtonState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    rootElm: HTMLSpanElement;
    componentWillReceiveProps(nextProps: RadioButtonProps): void;
    handleClick: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseEnter: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseLeave: (e?: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default RadioButton;
