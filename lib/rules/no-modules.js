/**
 * @fileoverview Rule to disallow ES6 modules.
 * @author Evan Welsh
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'disallow ES6 modules',
            category: 'GJS',
            recommended: true
        },
        schema: [] // no options
    },
    create: function (context) {
        function handleModuleDeclaration(node) {
            context.report({
                node,
                message: 'ES6 module syntax is not supported in GJS. Use the imports object instead.',
                data: {
                    description: ''
                }
            });
        }

        return {
            ImportDeclaration: handleModuleDeclaration,
            ExportNamedDeclaration: handleModuleDeclaration,
            ExportDefaultDeclaration: handleModuleDeclaration,
            ExportAllDeclaration: handleModuleDeclaration
        };
    }
};