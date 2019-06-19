import * as React from "react";
import * as PropTypes from "prop-types";
import "prismjs/components/prism-jsx.min.js";
export interface DataProps {
    /**
     * The Markdown string.
     */
    text?: string;
    /**
     * Use Custom Markdown CSS style in dark theme mode.
     */
    darkThemeCSSString?: string;
    /**
     * Use Custom Markdown CSS style in light theme mode.
     */
    lightThemeCSSString?: string;
}
export interface MarkdownRenderProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare class MarkdownRender extends React.Component<MarkdownRenderProps> {
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateThemeStyle: () => void;
    render(): JSX.Element;
}
export default MarkdownRender;
