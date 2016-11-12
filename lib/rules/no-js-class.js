/**
 * @fileoverview Rule to disallow ES6 native classes.
 * @author Evan Welsh
 */

"use strict";

const astUtils = require("eslint/lib/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow ES6 native classes",
            category: "GJS",
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
        }
    }
};