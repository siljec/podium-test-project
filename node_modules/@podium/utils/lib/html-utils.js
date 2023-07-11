/* eslint-disable no-restricted-syntax */

'use strict';

const notEmpty = (value) => {
    if (value === false) return value;
    if (value === undefined) return false;
    if (value === null) return false;
    if (value !== '') return true;
    return false;
};

const buildScriptAttributes = (obj) => {
    const args = [];
    args.push({ key: 'src', value: obj.value });

    if (obj.type === 'esm' || obj.type === 'module') {
        args.push({ key: 'type', value: 'module' });
    }

    if (notEmpty(obj.referrerpolicy)) {
        args.push({ key: 'referrerpolicy', value: obj.referrerpolicy });
    }

    if (obj.crossorigin || obj.crossorigin === '') {
        if (obj.crossorigin === true) args.push({ key: 'crossorigin' });
        else args.push({ key: 'crossorigin', value: obj.crossorigin });
    }

    if (notEmpty(obj.integrity)) {
        args.push({ key: 'integrity', value: obj.integrity });
    }

    if (notEmpty(obj.nomodule)) {
        args.push({ key: 'nomodule' });
    }

    if (notEmpty(obj.async)) {
        args.push({ key: 'async' });
    }

    if (notEmpty(obj.defer)) {
        args.push({ key: 'defer' });
    }

    if (Array.isArray(obj.data) && (obj.data.length !== 0)) {
        obj.data.forEach((item) => {
            args.push({ key: `data-${item.key}`, value: item.value });
        });
    }

    return args;
};

const buildReactScriptAttributes = (obj) => {
    const attrs = {};
    for (const { key, value } of buildScriptAttributes(obj)) {
        if (key === 'crossorigin') attrs.crossOrigin = value || '';
        else if (key === 'referrerpolicy') attrs.referrerPolicy = value;
        else if (key === 'nomodule') attrs.noModule = value || true;
        else if (key && !value) attrs[key] = true;
        else attrs[key] = value;
    }
    return attrs;
}

const buildScriptElement = (obj) => {
    const attrs = buildScriptAttributes(obj).map(({key, value}) => {
        if (!value && value !== '') return key;
        return `${key}="${value}"`;
    })
    return `<script ${attrs.join(' ')}></script>`;
};

const buildLinkAttributes = (obj) => {
    const args = [];
    args.push({ key: 'href', value: obj.value });

    if (obj.crossorigin || obj.crossorigin === '') {
        if (obj.crossorigin === true) args.push({ key: 'crossorigin' });
        else args.push({ key: 'crossorigin', value: obj.crossorigin });
    }

    if (notEmpty(obj.disabled)) {
        args.push({ key: 'disabled' });
    }

    if (notEmpty(obj.hreflang)) {
        args.push({ key: 'hreflang', value: obj.hreflang });
    }

    if (notEmpty(obj.title)) {
        args.push({ key: 'title', value: obj.title });
    }

    if (notEmpty(obj.media)) {
        args.push({ key: 'media', value: obj.media });
    }

    if (notEmpty(obj.as)) {
        args.push({ key: 'as', value: obj.as });
    }

    if (notEmpty(obj.type)) {
        args.push({ key: 'type', value: obj.type });
    }

    if (notEmpty(obj.rel)) {
        args.push({ key: 'rel', value: obj.rel });
    }

    return args;
};

const buildReactLinkAttributes = (obj) => {
    const attrs = {};
    for (const { key, value } of buildLinkAttributes(obj)) {
        if (key === 'crossorigin') attrs.crossOrigin = value || '';
        else if (key === 'hreflang') attrs.hrefLang = value;
        else if (key && !value) attrs[key] = true;
        else attrs[key] = value;
    }
    return attrs;
}

const buildLinkElement = (obj) => {
    const attrs = buildLinkAttributes(obj).map(({key, value}) => {
        if (!value && value !== '') return key;
        return `${key}="${value}"`;
    })
    return `<link ${attrs.join(' ')}>`;
};

module.exports.buildLinkAttributes = buildLinkAttributes;
module.exports.buildReactLinkAttributes = buildReactLinkAttributes;
module.exports.buildScriptAttributes = buildScriptAttributes;
module.exports.buildReactScriptAttributes = buildReactScriptAttributes;
module.exports.buildScriptElement = buildScriptElement;
module.exports.buildLinkElement = buildLinkElement;
