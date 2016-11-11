/**
 * @fileoverview Rule to disallow double quotes on non-translatable strings.
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
            description: "disallow double quotes on non-translatable strings",
            category: "Possible Errors",
            recommended: true
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function (context) {

        function isTranslating(node) {
            const parent = node.parent;

            if (parent.type === 'BinaryExpression') {
                return isTranslating(parent);
            }

            if (parent.type === 'CallExpression') {
                const func = parent.callee;
                if (func.type == 'Identifier') {
                    return (func.name === '_' || func.name === 'gtk30_' || func.name === 'gs_');
                }
            }
            return false;
        }

        // convert: Taken from eslint/lib/rules/quotes.js
        function convert(str, newQ, oldQ) {
            const newQuote = '"';
            const oldQuote = '\'';

            if (newQuote === oldQuote) {
                return str;
            }
            return newQuote + str.slice(1, -1).replace(/\\(\${|\r\n?|\n|.)|["'`]|\${|(\r\n?|\n)/g, (match, escaped, newline) => {
                if (escaped === oldQuote || oldQuote === "`" && escaped === "${") {
                    return escaped; // unescape
                }
                if (match === newQuote || newQuote === "`" && match === "${") {
                    return `\\${match}`; // escape
                }
                if (newline && oldQuote === "`") {
                    return "\\n"; // escape newlines
                }
                return match;
            }) + newQuote;
        }

        function convertToTranslatable(str) {
            const newQuote = '"';
            const oldQuote = '\'';

            return convert(str, newQuote, oldQuote);
        }

        function convertToStandard(str) {
            const newQuote = '\'';
            const oldQuote = '"';

            return convert(str, newQuote, oldQuote);
        }

        return {
            Literal(node) {
                const val = node.value
                const rawVal = node.raw;

                if (typeof val === "string") {

                    let singleQuoted = astUtils.isSurroundedBy(rawVal, '\'');
                    let doubleQuoted = astUtils.isSurroundedBy(rawVal, '\"');
                    let translating = isTranslating(node);

                    if (singleQuoted && translating) {
                        context.report({
                            node,
                            message: "Single quotes cannot be used for translation strings.",
                            data: {
                                description: ""
                            },
                            fix(fixer) {
                                return fixer.replaceText(node, convertToTranslatable(node.raw));
                            }
                        });
                    } else if (doubleQuoted && !translating) {
                        context.report({
                            node,
                            message: "Double quotes are reserved for translation strings.",
                            data: {
                                description: ""
                            },
                            fix(fixer) {
                                return fixer.replaceText(node, convertToStandard(node.raw));
                            }
                        });
                    }
                }

            }
        };
    }
};