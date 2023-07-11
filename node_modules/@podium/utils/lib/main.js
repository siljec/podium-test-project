'use strict';

const HttpIncoming = require('./http-incoming');
const document = require('./html-document');
const AssetCss = require('./asset-css');
const AssetJs = require('./asset-js');
const utils = require('./utils');
const html = require('./html-utils');

module.exports.isString = utils.isString;
module.exports.isFunction = utils.isFunction;
module.exports.uriBuilder = utils.uriBuilder;
module.exports.uriIsRelative = utils.uriIsRelative;
module.exports.pathnameBuilder = utils.pathnameBuilder;
module.exports.uriRelativeToAbsolute = utils.uriRelativeToAbsolute;
module.exports.setAtLocalsPodium = utils.setAtLocalsPodium;
module.exports.getFromLocalsPodium = utils.getFromLocalsPodium;
module.exports.duplicateOnLocalsPodium = utils.duplicateOnLocalsPodium;
module.exports.serializeContext = utils.serializeContext;
module.exports.deserializeContext = utils.deserializeContext;
module.exports.buildScriptElement = html.buildScriptElement;
module.exports.buildLinkElement = html.buildLinkElement;
module.exports.HttpIncoming = HttpIncoming;
module.exports.template = document;
module.exports.AssetCss = AssetCss;
module.exports.AssetJs = AssetJs;
