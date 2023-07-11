import { IncomingMessage, ServerResponse } from 'http';

declare interface PodiumAsset {
    readonly value: string;
    prefix?: boolean;
    toHTML(): string;
}

export type AssetCss = Pick<HTMLLinkElement, 'as' | 'crossOrigin' | 'disabled' | 'hreflang' | 'title' | 'media' | 'rel' | 'type'> &
    PodiumAsset;

export type AssetJs = Pick<HTMLScriptElement, 'referrerPolicy' | 'crossOrigin' | 'integrity' | 'noModule' | 'async' | 'defer' | 'type'> &
    PodiumAsset & {
    data?: DOMStringMap;
};

export class HttpIncoming<T = { [key: string]: unknown }> {
    constructor(request: IncomingMessage, response: ServerResponse, params: T);

    development: boolean;

    readonly response: ServerResponse;

    readonly request: IncomingMessage;

    context: any;

    readonly params: T;

    proxy: boolean;

    name: string;

    view: any;

    readonly url: URL;

    css: Array<AssetCss>;

    js: Array<AssetJs>;

    toJSON(): {
        development: boolean;
        context: any;
        params: T;
        proxy: boolean;
        name: string;
        url: URL;
        css: Array<AssetCss>;
        js: Array<AssetJs>;
    };
}
