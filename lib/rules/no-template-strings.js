/**
 * @fileoverview Rule to prevent template strings.
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
            description: "prevent template strings",
            category: "GJS",
            recommended: true
        },
        schema: [] // no options
    },
    create: function (context) {
        return {
            TemplateElement(node) {
                context.report({
                    node,
                    message: "GJS does not support template strings."
                });

            },
        }
    }
};