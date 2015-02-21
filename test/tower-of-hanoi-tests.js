/*global require, define, test, expect, strictEqual, location */

if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'tower-of-hanoi': '../tower-of-hanoi'
        },
        shim: {
            'underscore': {
                exports: '_'
            }
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of principium to the dist location
        require.config({
            paths: {
                'tower-of-hanoi': '../dist/tower-of-hanoi'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['tower-of-hanoi', 'jquery'], factory);
    } else {
        // Browser globals
        factory(root.toh, root.jQuery);
    }
}(this, function (toh, $) {
    'use strict';

    test('version test', function () {
        expect(1);
        strictEqual(toh.version,
            '0.0.1, jQuery version is: ' + $.fn.jquery,
            'Version concatenated');
    });

    test('conversion test', function () {
        expect(1);
        strictEqual(toh.convert('Harry & Sally'),
            'Harry &amp; Sally',
            'Ampersand converted');
    });

    test('conversion test', function () {
        expect(1);
        strictEqual(toh.convert('Harry & Sally'),
            'Harry &amp; Sally',
            'Ampersand converted');
    });
}));
