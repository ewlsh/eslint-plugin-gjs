/**
 * @fileoverview Rule to disallow the spread operator.
 * @author Evan Welsh
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'disallow the spread operator',
            category: 'GJS',
            recommended: true
        },
        schema: [] // no options
    },
    create: function (context) {
        return {
            SpreadElement(node) {
                context.report({
                    node,
                    message: 'The spread operator is not supported in GJS.',
                    data: {
                        description: ''
                    }
                });
            }
        };
    }
};