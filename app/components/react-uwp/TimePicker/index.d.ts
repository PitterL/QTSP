import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../common/AddBlurEvent";
import ListView from "../ListView";
export interface DataProps {
    /**
     * Set default `hour`.
     */
    defaultHour?: number;
    /**
     * Set default `minute`.
     */
    defaultMinute?: number;
    /**
     * Set default show `Picker` modal.
     */
    defaultShowPicker?: boolean;
    /**
     * `onChangeTime` callback.
     */
    onChangeTime?: (hours?: number, minutes?: number) => void;
    /**
     * Set `Input` element height.
     */
    inputItemHeight?: number;
    /**
     * Set `Picker` element height.
     */
    pickerItemHeight?: number;
    /**
     * Set Custom background.
     */
    background?: string;
}
export interface TimePickerProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface TimePickerState {
    showPicker?: boolean;
    currHour?: number;
    currMinute?: number;
}
export declare class TimePicker extends React.Component<TimePickerProps, TimePickerState> {
    static defaultProps: TimePickerProps;
    state: TimePickerState;
    addBlurEvent: AddBlurEvent;
    rootElm: HTMLDivElement;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    prevState: {
        currHour: number;
        currMinute: number;
    };
    hourListView: ListView;
    minuteListView: ListView;
    timeTypeListView: ListView;
    hourIndex: number;
    minuteIndex: number;
    timeTypeIndex: number;
    componentWillReceiveProps(nextProps: TimePickerProps): void;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleShowPicker: (showPicker?: any) => void;
    render(): JSX.Element;
}
export default TimePicker;
