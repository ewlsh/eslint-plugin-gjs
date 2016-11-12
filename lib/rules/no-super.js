/**
 * @fileoverview Rule to disallow the super operator.
 * @author Evan Welsh
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'disallow the super operator',
            category: 'GJS',
            recommended: true
        },
        schema: [] // no options
    },
    create: function (context) {
        return {
            Super(node) {
                context.report({
                    node,
                    message: 'The super operator is not supported in GJS.',
                    data: {
                        description: ''
                    }
                });
            }
        };
    }
};