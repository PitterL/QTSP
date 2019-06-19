import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../common/AddBlurEvent";
export interface DataProps {
    /**
     * Set default show value, `value` must is one of `values`, default is `values[0]`.
     */
    defaultValue?: string | string[];
    /**
     * Set DropDownMenu values.
     */
    values?: string[];
    /**
     * `onChangeValue` callback.
     */
    onChangeValue?: (value: string) => void;
    /**
     * Set DropDownMenu custom background.
     */
    background?: string;
    /**
     * Set DropDownMenu width, only this way set width is right (px).
     */
    itemWidth?: number;
    /**
     * Set DropDownMenu height, only this way set width is right (px).
     */
    itemHeight?: number;
    /**
     * Set DropDownMenu item padding (px).
     */
    padding?: number;
    /**
     * Set `wrapperElm` HTMLAttributes.
     */
    wrapperAttributes?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * Set `itemElm` HTMLAttributes.
     */
    itemAttributes?: React.HTMLAttributes<HTMLDivElement>;
}
export interface DropDownMenuProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface DropDownMenuState {
    showList?: boolean;
    currentValue?: string | string[];
    currentValues?: string[];
}
export declare class DropDownMenu extends React.Component<DropDownMenuProps, DropDownMenuState> {
    static defaultProps: DropDownMenuProps;
    state: DropDownMenuState;
    addBlurEvent: AddBlurEvent;
    rootElm: HTMLDivElement;
    wrapperElm: HTMLDivElement;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillReceiveProps(nextProps: DropDownMenuProps): void;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleShowList: (currentValue: string) => void;
    getValue: () => string | string[];
    render(): JSX.Element;
}
export default DropDownMenu;
