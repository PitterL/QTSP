import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Applied `hoverStyle` to the root element.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * Applied `focusStyle` to the root element.
     */
    focusStyle?: React.CSSProperties;
    /**
     * Applied `style` to the root input element.
     */
    textBoxStyle?: React.CSSProperties;
    /**
     * onChange value `callback`.
     */
    onChangeValue?: (value: string) => void;
    /**
     * Set `ReactNode` in input element left.
     */
    leftNode?: React.ReactNode;
    /**
     * Set `ReactNode` in input element right.
     */
    rightNode?: React.ReactNode;
    /**
     * Set TextBox `background`.
     */
    placeholder?: string;
    disabled?: string | boolean;
    background?: string;
    type?: string;
}
export interface TextBoxProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface TextBoxState {
    hovered?: boolean;
    focused?: boolean;
}
export declare class TextBox extends React.Component<TextBoxProps, TextBoxState> {
    static defaultProps: TextBoxProps;
    state: TextBoxState;
    rootElm: HTMLDivElement;
    inputElm: HTMLInputElement;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    handleClick: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleHover: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleUnHover: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleFocus: (e?: React.FocusEvent<HTMLInputElement>) => void;
    handleBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
    setValue: (value: string) => string;
    getValue: () => string;
    render(): JSX.Element;
}
export default TextBox;
