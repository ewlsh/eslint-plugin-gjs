/**
 * @fileoverview Adds compatibility for the GJS environment.
 * @author rockon999
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules

const GJS_RULES = {
    "no-undef": "error",
    "no-dupe-keys": "error",
    "keyword-spacing": "error",
    "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
    }],
    "object-shorthand": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "brace-style": ["error", "1tbs"],
    "indent": ["error", 4],
    "no-var": "error",
    "no-trailing-spaces": "error",
    "no-tabs": "error",
    "semi": "error",
    "gjs/no-computed-properties": "error",
    "gjs/no-generators": "error",
    "gjs/no-invalid-regexp": ["error", { "allowConstructorFlags": ["y"] }],
    "gjs/no-js-class": "error",
    "gjs/no-modules": "error",
    "gjs/no-numeric-literals": "error",
    "gjs/no-spread": "error",
    "gjs/no-super": "error",
    "gjs/no-template-strings": "error",
    "gjs/translation-strings": "error",
}

const GJS_GLOBALS_BASE = {
    "log": false,
    "logError": false,
    "print": false,
    "printerr": false,
    "imports": false,
    "ARGV": false,
    "global": false
};

module.exports = {
    rules: requireIndex(__dirname + "/rules"),


    // import processors
    processors: {},

    environments: {
        "application": {
            globals: function () {
                return Object.assign({
                    window: false,
                    pkg: false
                }, GJS_GLOBALS_BASE);
            } ()
        },
        "shell-extension": {
            globals: GJS_GLOBALS_BASE
        }
    },

    configs: {
        "extension": {
            plugin: ["gjs"],
            env: {
                "es6": true,
                "gjs/shell-extension": true
            },
            rules: GJS_RULES
        },
        "application": {
            plugin: ["gjs"],
            env: {
                "es6": true,
                "gjs/application": true
            },
            rules: GJS_RULES
        }
    }
};