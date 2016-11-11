/**
 * @fileoverview Rule to prevent es6 syntax that isn't in gjs.
 * @author Evan Welsh
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
//  -- DONE: "arrowFunctions": true,
//  TODO: "binaryLiterals": false,
//  -- DONE: "blockBindings": true,
//  -- DONE: "classes": false,
//  TODO: "defaultParams": true,
//  -- DONE: "destructuring": true,
//  -- DONE: "forOf": true,
//  TODO: "generators": false,
//  TODO: "modules": false,
//  TODO: "objectLiteralComputedProperties": false,
//  TODO: "objectLiteralDuplicateProperties": false,
//  TODO: "objectLiteralShorthandMethods": false,
//  TODO: "objectLiteralShorthandProperties": false,
//  TODO: "octalLiterals": false,
//  TODO: "regexUFlag": false,
//  DONE: "regexYFlag": true,
//  -- TODO: "spread": false,
//  -- TODO: "superInFunctions": false,
//  -- TODO: "templateStrings": false
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "prevent es6 syntax that is incompatible with GJS",
            category: "Possible Errors",
            recommended: true
        },
        schema: [] // no options
    },
    create: function (context) {
        return {
            ClassDeclaration(node) {
                context.report({
                    node,
                    message: "Javascript classes are not supported in GJS. Use Lang.Class instead.",
                    data: {
                        description: ""
                    }
                });
            }
        };
    }
};