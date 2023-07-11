'use strict';

const originalUrl = require('original-url');
const { URL } = require('url');

const _development = Symbol('podium:httpincoming:development');
const _response = Symbol('podium:httpincoming:response');
const _request = Symbol('podium:httpincoming:request');
const _context = Symbol('podium:httpincoming:context');
const _params = Symbol('podium:httpincoming:params');
const _proxy = Symbol('podium:httpincoming:proxy');
const _view = Symbol('podium:httpincoming:view');
const _name = Symbol('podium:httpincoming:name');
const _url = Symbol('podium:httpincoming:url');
const _css = Symbol('podium:httpincoming:css');
const _js = Symbol('podium:httpincoming:js');

const urlFromRequest = request => {
    try {
        const url = originalUrl(request);
        return new URL(url.raw, `${url.protocol}//${request.headers.host}`);
    } catch (err) {
        return {};
    }
};

const PodiumHttpIncoming = class PodiumHttpIncoming {
    constructor(request = {}, response = {}, params = {}) {
        const url = urlFromRequest(request);

        // Private properties
        this[_development] = false;
        this[_response] = response;
        this[_request] = request;
        this[_context] = {};
        this[_params] = params;
        this[_proxy] = false;
        this[_name] = '';
        this[_view] = {};
        this[_url] = url;
        this[_css] = [];
        this[_js] = [];
    }

    set development(value) {
        this[_development] = value;
    }

    get development() {
        return this[_development];
    }

    set response(value) {
        throw new Error('Cannot set read-only property.');
    }

    get response() {
        return this[_response];
    }

    set request(value) {
        throw new Error('Cannot set read-only property.');
    }

    get request() {
        return this[_request];
    }

    set context(value) {
        this[_context] = value;
    }

    get context() {
        return this[_context];
    }

    set podlets(value) {
        const podlets = Array.isArray(value) ? value : [value];

        podlets.forEach(podlet => {
            if (podlet.css) {
                podlet.css.forEach(item => {
                    this[_css].push(item);
                });
            }

            if (podlet.js) {
                podlet.js.forEach(item => {
                    this[_js].push(item);
                });
            }
        });
    }

    get podlets() {
        throw new Error(
            `The getter for .podlets is reserved for later implementation`,
        );
    }

    set params(value) {
        throw new Error('Cannot set read-only property.');
    }

    get params() {
        return this[_params];
    }

    set proxy(value) {
        this[_proxy] = value;
    }

    get proxy() {
        return this[_proxy];
    }

    set name(value) {
        this[_name] = value;
    }

    get name() {
        return this[_name];
    }

    set view(value) {
        this[_view] = value;
    }

    get view() {
        return this[_view];
    }

    set url(value) {
        this[_url] = value;
    }

    get url() {
        return this[_url];
    }

    set css(value) {
        if (!Array.isArray(value))
            throw new Error(`Value for property ".css" must be an Array`);
        this[_css] = value;
    }

    get css() {
        return this[_css];
    }

    set js(value) {
        if (!Array.isArray(value))
            throw new Error(`Value for property ".js" must be an Array`);
        this[_js] = value;
    }

    get js() {
        return this[_js];
    }

    toJSON() {
        return {
            development: this.development,
            context: this.context,
            params: this.params,
            proxy: this.proxy,
            view: this.view,
            name: this.name,
            url: this.url,
            css: this.css,
            js: this.js,
        };
    }

    get [Symbol.toStringTag]() {
        return 'PodiumHttpIncoming';
    }
};

module.exports = PodiumHttpIncoming;
