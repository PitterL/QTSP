import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Checkbox is checked if `true`.
     */
    defaultChecked?: true | false | null;
    /**
     * `Callback` function that is fired when the checkbox is checked.
     */
    onCheck?: (checked?: boolean) => void;
    /**
     * If use `label`, `labelPosition` to control label position.
     */
    labelPosition?: "left" | "right";
    /**
     * Set custom background to CheckBox.
     */
    background?: string;
    size?: string | number;
    label?: string;
    disabled?: boolean | string;
}
export interface CheckBoxProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface CheckBoxState {
    checked?: boolean;
}
export declare class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {
    static defaultProps: CheckBoxProps;
    state: CheckBoxState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    /**
     * rootElm `HTMLDivElement`
     */
    rootElm: HTMLDivElement;
    componentWillReceiveProps(nextProps: CheckBoxProps): void;
    /**
     * `Public` Toggle Checked Method.
     */
    toggleChecked: (e?: React.SyntheticEvent<HTMLDivElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default CheckBox;
