/*global define */

/**
 * The main module that defines the public interface for principium,
 * a made-up library to demonstrate how to construct a source from components.
 */
define(function (require) {
    'use strict';

    var $ = require('jquery'),
        convert = require('tower-of-hanoi/convert'),
        core = require('tower-of-hanoi/toh-core'),
        ui = require('tower-of-hanoi/toh-ui'),
        main = require('tower-of-hanoi/main');

    //Return the module value.
    return {
        version: '0.0.1, jQuery version is: ' + $.fn.jquery,
        convert: convert,
        main: main
    };
});
