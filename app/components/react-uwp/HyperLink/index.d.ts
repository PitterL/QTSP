import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * `ref` to link, other attributes is applied to `HTMLAnchorElement`.
     */
    ref?: string;
    href?: string;
    target?: string;
}
export interface HyperLinkProps extends DataProps, React.HTMLAttributes<HTMLAnchorElement> {
}
export declare class HyperLink extends React.Component<HyperLinkProps> {
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default HyperLink;
