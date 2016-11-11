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
module.exports = {
    rules: requireIndex(__dirname + "/rules"),


    // import processors
    processors: {},

    environments: {
        "application": {
            globals: {
                "log": false,
                "logError": false,
                "print": false,
                "printerr": false,
                "imports": false,
                "ARGV": false,
                "global": false,
                "pkg": false,
                "window": false
            }
        },
        "shell-extension": {
            globals: {
                "log": false,
                "logError": false,
                "print": false,
                "printerr": false,
                "imports": false,
                "ARGV": false,
                "global": false
            }
        }
    },

    configs: {
        "extension": {
            plugin: ["gjs"],
            env: {
                "es6": true,
                "gjs/shell-extension": true
            },
            rules: {
                "no-undef": ["error"],
                "keyword-spacing": ["error"],
                "space-before-function-paren": ["error", {
                    "anonymous": "never",
                    "named": "never",
                    "asyncArrow": "always"
                }],
                "space-before-blocks": ["error", "always"],
                "brace-style": ["error", "1tbs"],
                "indent": ["error", 4],
                "no-var": "error",
                "no-trailing-spaces": "error",
                "no-tabs": "error",
                "semi": "error",
                "gjs/translatable-strings": "error",
                "gjs/unsupported-syntax": "error"
            }
        },
        "application": {
            plugin: ["gjs"],
            env: {
                "es6": true,
                "gjs/application": true
            },
            rules: {
                "no-undef": ["error"],
                "keyword-spacing": ["error"],
                "space-before-function-paren": ["error", {
                    "anonymous": "never",
                    "named": "never",
                    "asyncArrow": "always"
                }],
                "space-before-blocks": ["error", "always"],
                "brace-style": ["error", "1tbs"],
                "indent": ["error", 4],
                "no-var": "error",
                "no-trailing-spaces": "error",
                "no-tabs": "error",
                "semi": "error",
                "gjs/translatable-strings": "error",
                "gjs/unsupported-syntax": "error"
            }
        }
    }
};