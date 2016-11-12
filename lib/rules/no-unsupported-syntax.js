/**
 * @fileoverview Rule to prevent ECMAScript 2015 (ES6) syntax that isn't incorporated into GJS.
 * @author Evan Welsh
 * 
 * @deprecated in eslint-plugin-gjs v0.0.3
 */

"use strict";

const astUtils = require("eslint/lib/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Feature support in GJS (SpiderMonkey 35)
//------------------------------------------------------------------------------
//
//  -- SUPPORTED: "arrowFunctions": true,
//  no-numeric-literals.js -- DONE: "binaryLiterals": false,
//  -- SUPPORTED: "blockBindings": true,
//  no-js-class.js -- DONE: "classes": false,
//  -- SUPPORTED: "defaultParams": true,
//  -- SUPPORTED: "destructuring": true,
//  -- SUPPORTED: "forOf": true,
//  no-generators.js -- DONE: "generators": false,
//  no-modules.js -- DONE: "modules": false,
//     >> TODO: Double check this implementation.
//  no-computed-properties.js -- DONE: "objectLiteralComputedProperties": false,
//  -- DONE (via standard rules): "objectLiteralDuplicateProperties": false,
//  -- DONE (via standard rules): "objectLiteralShorthandMethods": false,
//  -- DONE (via standard rules): "objectLiteralShorthandProperties": false,
//  no-numeric-literals.js -- DONE: "octalLiterals": false,
//  no-invalid-regexp.js -- DONE (via forked 'no-invalid-regexp'): "regexUFlag": false,
//  -- SUPPORTED: "regexYFlag": true,
//  no-spread.js -- DONE: "spread": false,
//  no-super.js -- DONE: "superInFunctions": false,
//  no-template-strings.js -- DONE: "templateStrings": false
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "prevent ES6 syntax that is incompatible with GJS",
            category: "GJS",
            recommended: true
        },
        deprecated: true,
        schema: [] // no options
    },
    create: function (context) {
        function handleModuleDeclaration(node) {
            context.report({
                node,
                message: "ES6 module syntax is not supported in GJS. Use the imports object instead.",
                data: {
                    description: ""
                }
            });
        }

        function handleFunctionDeclaration(node) {
            if (node.generator) {
                context.report({
                    node,
                    message: "GJS does not support generator functions.",
                    data: {
                        description: ""
                    }
                });
            }
        }

        return {
            ClassDeclaration(node) {
                context.report({
                    node,
                    message: "Javascript classes are not supported in GJS. Use Lang.Class instead.",
                    data: {
                        description: ""
                    }
                });
            },
            Literal(node) {
                // regex - taken from eslint/lib/rules/no-template-curly-in-string.js
                const regex = /\$\{[^}]+\}/;
                
                if (typeof node.value === "string" && regex.test(node.value)) {
                    context.report({
                        node,
                        message: "GJS does not support template strings."
                    });
                }
            },
            ImportDeclaration: handleModuleDeclaration,
            ExportNamedDeclaration: handleModuleDeclaration,
            ExportAllDeclaration: handleModuleDeclaration,
            FunctionDeclaration: handleFunctionDeclaration,
            FunctionExpression: handleFunctionDeclaration,
            Super(node) {
                context.report({
                    node,
                    message: "The super operator is not supported in GJS.",
                    data: {
                        description: ""
                    }
                });
            },
            SpreadElement(node) {
                context.report({
                    node,
                    message: "The spread operator is not supported in GJS.",
                    data: {
                        description: ""
                    }
                });
            },
            Property(node) {
                if (node.computed) {
                    context.report({
                        node,
                        message: "Computed property keys are not supported in GJS.",
                        data: {
                            description: ""
                        }
                    });
                }
            }
        }
    }
};