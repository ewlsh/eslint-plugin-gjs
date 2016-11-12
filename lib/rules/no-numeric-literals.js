/**
 * @fileoverview Rule to disallow binary, octal, and hexadecimal literals in favor of `parseInt()` 
 * @author Evan Welsh
 * 
 * Derived from eslint/lib/rules/prefer-numeric-literals.js
 * @author Annie Zhang, Henry Zhu
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow binary, octal, and hexadecimal literals in favor of `parseInt()`",
            category: "GJS",
            recommended: false
        },

        schema: [],

        fixable: "code"
    },

    create(context) {
        const radixMap = {
            2: "binary",
            8: "octal",
            16: "hexadecimal"
        };

        const prefixMap = {
            2: "0b",
            8: "0o",
            16: "0x"
        };

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            Literal(node) {
                let value = node.value;
                let raw = node.raw;

                if (typeof value !== "number") {
                    return;
                }

                for (let radix of Object.getOwnPropertyNames(prefixMap)) {
                    if (raw.startsWith(prefixMap[radix])) {
                        let unprefixed = raw.substring(2);
                        let radixName = radixMap[radix];

                        context.report({
                            node,
                            message: "GJS does not support {{radixName}} literals. Use parseInt('{{unprefixed}}', {{radix}}) instead.",
                            data: {
                                unprefixed,
                                radix,
                                radixName
                            },
                            fix(fixer) {
                                return fixer.replaceText(node, 'parseInt(\'' + unprefixed + '\', ' + radix + ')');
                            }
                        });

                        break;
                    }

                }
            }
        };
    }
};