'use strict';

const { validate } = require('@podium/schemas');
const { uriIsRelative, pathnameBuilder } = require('./utils');
const { buildLinkElement, buildReactLinkAttributes } = require('./html-utils');

// Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
// NOTE: Only includes attributes used for loading CSS

const _crossorigin = Symbol('podium:asset:css:crossorigin');
const _pathname = Symbol('podium:asset:css:pathname');
const _disabled = Symbol('podium:asset:css:disabled');
const _hreflang = Symbol('podium:asset:css:hreflang');
const _prefix = Symbol('podium:asset:css:prefix');
const _title = Symbol('podium:asset:css:title');
const _value = Symbol('podium:asset:css:value');
const _media = Symbol('podium:asset:css:media');
const _type = Symbol('podium:asset:css:type');
const _rel = Symbol('podium:asset:css:rel');
const _as = Symbol('podium:asset:css:as');

const toUndefined = value => {
    if (value === false) return undefined;
    if (value === '') return undefined;
    return value;
};

const PodiumAssetCss = class PodiumAssetCss {
    constructor({
        crossorigin = undefined,
        pathname = '',
        disabled = false,
        hreflang = '',
        prefix = false,
        title = '',
        value = undefined,
        media = '',
        type = 'text/css',
        rel = 'stylesheet',
        as = '',
    } = {}) {
        if (validate.css(value).error)
            throw new Error(
                `Value for argument variable "value", "${value}", is not valid`,
            );

        this[_pathname] = pathname;
        this[_prefix] = prefix;
        this[_value] = value;

        this[_crossorigin] = crossorigin;
        this[_disabled] = disabled;
        this[_hreflang] = hreflang;
        this[_title] = title;
        this[_media] = media;
        this[_type] = type;
        this[_rel] = rel;
        this[_as] = as;
    }

    get crossorigin() {
        return this[_crossorigin];
    }

    set crossorigin(value) {
        this[_crossorigin] = value;
    }

    get disabled() {
        return this[_disabled];
    }

    set disabled(value) {
        this[_disabled] = value;
    }

    get hreflang() {
        return this[_hreflang];
    }

    set hreflang(value) {
        this[_hreflang] = value;
    }

    get title() {
        return this[_title];
    }

    set title(value) {
        this[_title] = value;
    }

    get value() {
        const pathname = this[_prefix] ? this[_pathname] : '';
        const value = this[_value];
        return uriIsRelative(value) ? pathnameBuilder(pathname, value) : value;
    }

    set value(value) {
        throw new Error('Cannot set read-only property.');
    }

    get media() {
        return this[_media];
    }

    set media(value) {
        this[_media] = value;
    }

    get type() {
        return this[_type];
    }

    set type(value) {
        this[_type] = value;
    }

    get href() {
        return this.value;
    }

    set href(value) {
        throw new Error('Cannot set read-only property.');
    }

    get rel() {
        return this[_rel];
    }

    set rel(value) {
        this[_rel] = value;
    }

    get as() {
        return this[_as];
    }

    set as(value) {
        this[_as] = value;
    }

    toJSON() {
        return {
            crossorigin: toUndefined(this.crossorigin),
            disabled: toUndefined(this.disabled),
            hreflang: toUndefined(this.hreflang),
            title: toUndefined(this.title),
            value: this[_value],
            media: toUndefined(this.media),
            type: this.type,
            rel: this.rel,
            as: toUndefined(this.as),
        };
    }

    toHTML() {
        return buildLinkElement(this);
    }

    toJsxAttributes() {
        return buildReactLinkAttributes(this);
    }

    get [Symbol.toStringTag]() {
        return 'PodiumAssetCss';
    }
};

module.exports = PodiumAssetCss;
