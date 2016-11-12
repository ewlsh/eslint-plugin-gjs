/**
 * @fileoverview Rule to disallow computed property keys.
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
            description: "disallow computed property keys",
            category: "GJS",
            recommended: true
        },
        schema: [] // no options
    },
    create: function (context) {
        return {
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