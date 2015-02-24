# Tower of Hanoi in JavaScript

This is a **Tower of Hanoi** library written in JavaScript. It generate *Tower of Hanoi UI* on html page. It has support for *browser globals* as well as *AMD*. The minified library file present inside **./dist**.

#### See [Live Demo](http://susovan87.github.io/tower-of-hanoi-js)

This library depends on two external libraries:

* [jQuery](http://jquery.com/)
* [underscorejs](http://underscorejs.org/)

The minified library doesn't include *jQuery* and *underscorejs*. So *jQuery* and *underscorejs* must be loaded before using this library.

## How to use this library

* Simply copy the minified library file `dist/tower-of-hanoi.js` into your project's workspace
* Include this library into your HTML page
```javascript
<script src="js/tower-of-hanoi.js"></script>
```
* Make sure you have included [jQuery](http://jquery.com/) and [underscorejs](http://underscorejs.org/) before this
```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="js/underscore.js"></script>
```
* After you page gets loaded, run the below JavaScript
```javascript
var toh = new ToH();  // use window.ToH for browser global

toh.render();    // DOM element can be passed into render method
                // to UI inside that element

toh.runAll();   // to execute all the moves
```
* `ToH` constructor accept a configuration object, default value below. Pass your customized config and see the change
```javascript
{
	disk:{
		count: 3,
		maxWidth: 200,
		minWidth: 100,
		height: 20,
        text:[],
        color:[]
	},
	peg:{
		width: 10
	}
}
```

## Few APIs

* `ToH` object has below methods to simulate the moves
```javascript
toh.runAll(callback);   // to simulate all the moves
toh.runAllBackward(callback) // to reverse all the moves
toh.next(callback); // to simulate single move
toh.prev(callback); // to simulate single reverse move
toh.pause();    // to stop simulation
toh.getSolution();  // return an array of moves to solve the puzzle
toh.getProgress();  // return the current simulate count
```
* `ToH` also fire two events `start` and `stop`, when UI simulation starts and stops

There are lot more to get surprise. Start exploring the code

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
