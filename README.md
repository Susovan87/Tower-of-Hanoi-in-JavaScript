# Tower of Hanoi in JavaScript

This is a **Tower of Hanoi** JavaScript library work either with browser globals or with an AMD loader. The minified library file present inside **./dist**.

The library also depends on two other libraries:
* [jQuery](http://jquery.com/)
* [underscorejs](http://underscorejs.org/)

The minified library doesn't include *jQuery* and *underscorejs*. So *jQuery* and *underscorejs* must be loaded first before using this library.

## File structure

This project creates a library called **tower-of-hanoi.js**.

* **dist/tower-of-hanoi.js**: the built library suitable for distribution.
* **lib**: contains lib scripts used during dev and testing.
* **test**: the [QUnit](http://qunitjs.com/)-based tests.
* **tools**: the helper tools/scripts used to build the output file.
* **tower-of-hanoi**: holds the sub-modules used by the main `tower-of-hanoi.js` module
to help implement the library's functionality.
* **tower-of-hanoi.js**: the main module entry point for the source-form of the
library.

## How to do development

* Modify `tower-of-hanoi.js` and its submodules in the `tower-of-hanoi` directory.
* Create tests for the functionality in the `test` directory.
* Load `test/index.html` to run the tests (only a few test written as off now).
* Load `test/index-ui-test.html` to test manually.

## How to build the library

The **r.js optimizer** is used to build the library. See the [r.js README](https://github.com/jrburke/r.js) for instructions on how to install on your local machine.

After r.js installation using Node `npm install -g requirejs`, run this command in the same directory as this README:

    r.js -o tools/build.js

In windows machine you need to run `r.js.cmd` instead of `r.js`

    r.js.cmd -o tools/build.js

This will generate the minified built file in `dist/tower-of-hanoi.js`.

**Test** the built file by running these files:

* **test/index-dist-amd.html**: For testing the dist version of the library with an AMD loader.
* **test/index-dist-global.html**: For testing the dist version of the library in a "browser globals and script tags" environment.
* **test/index-ui-test.html**: For manually testing the dist version of the library in a "browser globals and script tags" environment.
