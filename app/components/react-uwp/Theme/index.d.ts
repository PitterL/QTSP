import * as React from "react";
import * as PropTypes from "prop-types";
import getTheme from "../styles/getTheme";
import RenderToBody from "../RenderToBody";
import ToastWrapper from "../Toast/ToastWrapper";
export { getTheme };
export interface DataProps {
    /**
     * Set theme object. [ThemeType](https://github.com/myxvisual/react-uwp/blob/master/typings/index.d.ts#L43), Usually use [getTheme](https://github.com/myxvisual/react-uwp/blob/master/src/styles/getTheme.ts#L28) function to get it.
     */
    theme?: ReactUWP.ThemeType;
    /**
     * For simple development, autoSaveTheme can read and save theme to `localStorage`. use global context `theme.saveTheme` method to save.
     */
    autoSaveTheme?: boolean;
    /**
     * set theme will update callback.
     */
    themeWillUpdate?: (theme?: ReactUWP.ThemeType) => void;
    /**
     * onGeneratedAcrylic callback, base acrylic textures is base64 url image, for production, you can set this callback, post image to your server, and update theme(use this callback will not auto update theme).
     */
    onGeneratedAcrylic?: (theme?: ReactUWP.ThemeType) => void;
    /**
     * for production if you have generated acrylic textures, you can disabled generation acrylic textures.
     */
    needGenerateAcrylic?: boolean;
    /**
     * default is "*", set all element scroll bar style to uwp style.
     */
    scrollBarStyleSelector?: string;
}
export interface ThemeProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ThemeState {
    currTheme?: ReactUWP.ThemeType;
}
export declare class Theme extends React.Component<ThemeProps, ThemeState> {
    static defaultProps: ThemeProps;
    static childContextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    acrylicTextureCount: number;
    themeClassName: string;
    cacheDarkAcrylicTextures: ReactUWP.ThemeType;
    cacheLightAcrylicTextures: ReactUWP.ThemeType;
    toastWrapper: ToastWrapper;
    prevStyleManager: ReactUWP.StyleManager;
    backgroundEl: RenderToBody;
    getDefaultTheme: () => ReactUWP.ThemeType;
    getLocalStorageTheme: () => ReactUWP.ThemeType;
    bindNewThemeMethods: (theme: ReactUWP.ThemeType) => void;
    handleNewTheme: (theme: ReactUWP.ThemeType) => void;
    state: ThemeState;
    getChildContext: () => {
        theme: ReactUWP.ThemeType;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ThemeProps): void;
    componentWillUpdate(nextProps: ThemeProps, nextState: ThemeState): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    updateTheme: (newTheme?: ReactUWP.ThemeType, callback?: (theme?: ReactUWP.ThemeType) => void) => void;
    forceUpdateTheme: (currTheme: ReactUWP.ThemeType) => void;
    saveTheme: (currTheme: ReactUWP.ThemeType) => void;
    sureNeedGenerateAcrylic: (newTheme: ReactUWP.ThemeType) => boolean;
    findToastNodeTimers: any[];
    toastId: number;
    addToast: (toast: React.ReactElement<any>, callback?: (toastId?: number) => void, increaseId?: boolean, currToastId?: number) => void;
    updateToast: (toastId: number, toast: React.ReactElement<any>) => void;
    deleteToast: (toastId: number) => void;
    handleScrollReveal: (e?: Event) => void;
    cleanLocalStorage: () => void;
    render(): JSX.Element;
}
export default Theme;
