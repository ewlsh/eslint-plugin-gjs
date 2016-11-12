/**
 * @fileoverview Adds compatibility for the GJS environment.
 * @author rockon999
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules

const GJS_INDENT = 4;

const GJS_RULES = {
    'comma': 'error',
    'no-unreachable': 'error',
    'no-undef': 'error',
    'no-dupe-keys': 'error',
    'keyword-spacing': 'error',
    'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
    }],
    'linebreak-style': ['error', 'unix'],
    'object-shorthand': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'indent': ['error', GJS_INDENT],
    'no-var': 'error',
    'no-trailing-spaces': 'error',
    'no-tabs': 'error',
    'semi': 'error',
    'gjs/no-computed-properties': 'error',
    'gjs/no-generators': 'error',
    'gjs/no-invalid-regexp': ['error', { 'allowConstructorFlags': ['y'] }],
    'gjs/no-js-class': 'error',
    'gjs/no-modules': 'error',
    'gjs/no-numeric-literals': 'error',
    'gjs/no-spread': 'error',
    'gjs/no-super': 'error',
    'gjs/no-template-strings': 'error',
    'gjs/translation-strings': 'error'
};

const GJS_GLOBALS_BASE = {
    'ARGV': false,
    'Debugger': false,
    'GjsFileImporter': false,
    'imports': false,
    'InternalError': false,
    'Iterator': false,
    'log': false,
    'logError': false,
    'print': false,
    'printerr': false,
    'StopIteration': false,
    'uneval': false,
    'window': false
};

module.exports = {
    rules: requireIndex(__dirname + '/rules'),

    processors: {},

    environments: {
        'application': {
            globals: function () {
                return Object.assign({
                    'pkg': false,
                    'C_': false,
                    'N_': false,
                    '_': false
                }, GJS_GLOBALS_BASE);
            } ()
        },
        'shell-extension': {
            globals: function () {
                return Object.assign({
                    'global': false,
                    'C_': false,
                    'N_': false,
                    '_': false,
                    'ngettext': false
                }, GJS_GLOBALS_BASE);
            } ()
        },
        'cairo': {
            globals: {
                'CairoLinearGradient': false,
                'CairoRadialGradient': false,
                'CairoPDFSurface': false,
                'CairoPSSurface': false,
                'CairoSVGSurface': false,
                'CairoImageSurface': false,
                'CairoSurfacePattern': false,
                'CairoContext': false,
                'CairoRegion': false,
                'CairoGradient': false,
                // TODO: Is this a global? 'CairoPath': false,
                'CairoSolidPattern': false,
                'CairoPattern': false,
                'CairoSurface': false
            }
        },
        'girepository': {
            'GIRepository': false,
            'GIRepositoryGType': false,
            'GIRepositoryFunction': false,
            'GIRepositoryNamespace': false
        }
    },

    configs: {
        'extension': {
            plugin: ['gjs'],
            env: {
                'es6': true,
                'gjs/shell-extension': true
            },
            rules: GJS_RULES
        },
        'application': {
            plugin: ['gjs'],
            env: {
                'es6': true,
                'gjs/application': true
            },
            rules: GJS_RULES
        }
    }
};