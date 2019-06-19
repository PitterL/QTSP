import * as React from "react";
import * as PropTypes from "prop-types";
import TextBox from "../TextBox";
import ListView from "../ListView";
export interface DataProps {
    /**
     * Array of strings or nodes used to populate the list.
     */
    listSource?: React.ReactNode[];
    /**
     * `AutoSuggestBox` onChange callback.
     */
    onChangeValue?: (value: string) => void;
    /**
     * Array of strings or nodes used to populate the list.
     */
    searchAction?: (value?: string) => void;
    /**
     * Inside Icon Size, use `number`.
     */
    iconSize?: number;
    /**
     * Control component `background` style.
     */
    background?: string;
    placeholder?: string;
}
export interface AutoSuggestBoxProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface AutoSuggestBoxState {
    typing?: boolean;
    showListSource?: boolean;
    focusListSourceIndex?: number;
}
export declare class AutoSuggestBox extends React.Component<AutoSuggestBoxProps, AutoSuggestBoxState> {
    static defaultProps: AutoSuggestBoxProps;
    state: AutoSuggestBoxState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    /**
     * `Input` component.
     */
    textBox: TextBox;
    listView: ListView;
    inputTimer: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    checkLayerClick: (e: Event) => void;
    checkLayerKeydown: (e: KeyboardEvent) => void;
    toggleShowListSource: (showListSource?: any) => void;
    showListSource: () => void;
    handleChange: (e?: any) => void;
    /**
     * `Get` input value method.
     */
    getValue: () => string;
    /**
     * `Set` input value method.
     */
    setValue: (value: string) => string;
    /**
     * `Reset` input value method.
     */
    handleButtonAction: (e: React.MouseEvent<HTMLInputElement>) => void;
    handleChooseItem: (index: number) => void;
    handleInputKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default AutoSuggestBox;
