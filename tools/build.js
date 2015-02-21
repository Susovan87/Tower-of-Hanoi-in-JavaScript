{
    "baseUrl": "../lib",
    "paths": {
        "tower-of-hanoi": "../tower-of-hanoi"
    },
    "include": ["../tools/almond", "tower-of-hanoi"],
    "exclude": ["jquery", "underscore"],
    "out": "../dist/tower-of-hanoi.js",
    "wrap": {
        "startFile": "wrap.start",
        "endFile": "wrap.end"
    }
}
