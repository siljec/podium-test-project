'use strict';

const utils = require('./html-utils');

const document = (incoming = {}, body = '', head = '') => {
    let scripts = incoming.js;
    let styles = incoming.css;

    // backwards compatibility for scripts and styles
    if (typeof incoming.js === 'string') scripts = [{ type: 'default', value: incoming.js }];
    if (typeof incoming.css === 'string') styles = [{ type: 'text/css', value: incoming.css, rel: 'stylesheet' }];

    return `<!doctype html>
<html lang="${incoming.context.locale ? incoming.context.locale : 'en-US'}">
    <head>
        <meta charset="${incoming.view.encoding ? incoming.view.encoding : 'utf-8'}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        ${styles.map(utils.buildLinkElement).join('\n        ')}
        ${scripts.map(utils.buildScriptElement).join('\n        ')}
        <title>${incoming.view.title ? incoming.view.title : ''}</title>
        ${head}
    </head>
    <body>
        ${body}
    </body>
</html>`;
};

module.exports = document;
