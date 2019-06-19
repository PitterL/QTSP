import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Set MediaPlayer display mode.
     */
    displayMode?: "default" | "minimum" | "reset";
    /**
     * Control show the MediaPlayer controls.
     */
    showControl?: boolean;
    /**
     * The url of a video or song to play.
     */
    url?: string;
    /**
     * Sets the width of the player.
     */
    width?: number;
    /**
     * Sets the height of the player.
     */
    height?: number;
    /**
     * Set to `true` or `false` to pause or play the media.
     */
    playing?: boolean;
    /**
     * Set to `true` or `false` to loop the media.
     */
    loop?: boolean;
    /**
     * Set to `true` or `false` to display native player controls<br />*Note: Vimeo player controls are not configurable and will always display*
     */
    controls?: boolean;
    /**
     * Sets the volume of the appropriate player.
     */
    volume?: number;
    /**
     * Sets the playback rate of the appropriate player.
     */
    playbackRate?: number;
    /**
     * The time between `onProgress` callbacks, in milliseconds.
     */
    progressFrequency?: number;
    /**
     * Configuration object for the SoundCloud player.<br />Set `clientId` to your own SoundCloud app [client Id](https://soundcloud.com/you/apps).<br />Set `showArtwork` to `false` to not load any artwork to display.
     */
    soundcloudConfig?: {
        clientId: string;
        showArtwork: boolean;
    };
    /**
     * Configuration object for the YouTube player.<br />Set `playerVars` to override the [default player vars](https://developers.google.com/youtube/player_parameters?playerVersion=HTML5).<br />Set `preload` for [preloading](#preloading).
     */
    youtubeConfig?: {
        playerVars: Object;
        preload: boolean;
    };
    /**
     * Configuration object for the Vidme player.<br />Set `format` to use a certain quality of video, when available.
     */
    vimeoConfig?: {
        iframeParams: Object;
        preload: boolean;
    };
    /**
     * Configuration object for the file player.<br />Set `attributes` to apply [element attributes](https://developer.mozilla.org/en/docs/Web/HTML/Element/video#Attributes).
     */
    fileConfig?: {
        attributes: Object;
    };
    /**
     * Called when media is loaded and ready to play. If `playing` is set to `true`, media will play immediately.
     */
    onReady?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Called when media starts playing.
     */
    onStart?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Called when media starts or resumes playing after pausing or buffering.
     */
    onPlay?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Called when media is paused.
     */
    onPause?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Called when media starts buffering.
     */
    onBuffer?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Called when media finishes playing.
     */
    onEnded?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Called when an error occurs whilst attempting to play media.
     */
    onError?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Callback containing duration of the media, in seconds.
     */
    onDuration?: React.ReactEventHandler<HTMLDivElement>;
    /**
     * Callback containing progress `played`, `loaded` (fraction), `playedSeconds` and `loadedSeconds`.
     */
    onProgress?: React.ReactEventHandler<HTMLDivElement>;
    className?: string;
    style?: React.CSSProperties;
    onTouchStart?: React.ReactEventHandler<HTMLDivElement>;
    onMouseEnter?: React.ReactEventHandler<HTMLDivElement>;
    onMouseLeave?: React.ReactEventHandler<HTMLDivElement>;
    onMouseMove?: React.ReactEventHandler<HTMLDivElement>;
}
export interface MediaPlayerProps extends DataProps {
}
export interface MediaPlayerState {
    currShowControl?: boolean;
    currPlaying?: boolean;
    currVolume?: number;
    currPlayed?: number;
    currLoaded?: number;
    currPlaybackRate?: number;
    fullScreenMode?: boolean;
    duration?: number;
    played?: number;
    loaded?: number;
}
export declare class MediaPlayer extends React.Component<MediaPlayerProps, MediaPlayerState> {
    static defaultProps: MediaPlayerProps;
    getProps2State: (props: MediaPlayerProps) => MediaPlayerState;
    state: MediaPlayerState;
    componentWillReceiveProps(nextProps: MediaPlayerProps): void;
    rootElm: HTMLDivElement;
    showControlTimer: any;
    mouseMoveTimer: any;
    endTimer: any;
    reactPlayer: any;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillUpdate(): void;
    handleMouseEnter: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseLeave: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseMove: (e?: React.MouseEvent<HTMLDivElement>) => void;
    handleTouchStart: (e?: React.TouchEvent<HTMLDivElement>) => void;
    toggleShowControl: (currShowControl?: any) => void;
    togglePlaying: (currPlaying?: any) => void;
    handleFullScreenAction: () => void;
    existFullscreen: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    exitFullScreen: () => void;
    handleEnded: () => void;
    render(): JSX.Element;
}
export default MediaPlayer;
