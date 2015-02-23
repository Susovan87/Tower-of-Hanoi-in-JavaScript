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
        factory(root.ToH, root.jQuery);
    }
}(this, function (ToH, $) {
    'use strict';

    test('version test', function () {
        expect(1);
        var toh = new ToH();
        strictEqual(toh.version(),
            '1.0.0, jQuery version is: ' + $.fn.jquery,
            'Version concatenated');
    });

}));
