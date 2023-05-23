'use strict';

const debug = require('debug')('plugin:demo');

module.exports.Plugin = ArtilleryPluginDemo;

/**
 * A plugin to demonstrate some of the functionality of a plugin.
 * @param script { Object }
 * @param events { EventEmmiter }
 * @constructor
 */
function ArtilleryPluginDemo (script, events) {
    const flowElement = script.scenarios[0].flow;
    flowElement[0].get.url = '/echo/changed';
    flowElement.push({get: { url: '/echo/added'}});
    flowElement.push({log: 'Plugin'});
}
