/**
 * @fileoverview Rule to disallow generator functions.
 * @author Evan Welsh
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'disallow generator functions',
            category: 'GJS',
            recommended: true
        },
        schema: [] // no options
    },
    create: function (context) {
        function handleFunctionDeclaration(node) {
            if (node.generator) {
                context.report({
                    node,
                    message: 'GJS does not support generator functions.',
                    data: {
                        description: ''
                    }
                });
            }
        }

        return {
            FunctionDeclaration: handleFunctionDeclaration,
            FunctionExpression: handleFunctionDeclaration
        };
    }
};