/*global define */

/**
 * The main module that defines the public interface for principium,
 * a made-up library to demonstrate how to construct a source from components.
 */
define(function (require) {
    'use strict';

    var ToH = require('tower-of-hanoi/toh');

    //Return the module value.
    return ToH;
});
