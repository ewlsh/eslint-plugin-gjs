/**
 * @fileoverview Tests for no-numeric-literals rule.
 * @author Annie Zhang, Evan Welsh
 */

"use strict";

// "GJS does not support {{radixName}} literals. Use parseInt({{unprefixed}}, {{radix}}) instead."

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-numeric-literals"),
     RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-numeric-literals", rule, {
    valid: [
        "1234",
        {
            code: "parseInt(\"111110111\", 2) === 503;",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "parseInt(\"767\", 8) === 503;",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "parseInt(\"1F7\", 16) === 255;",
            parserOptions: { ecmaVersion: 6 },
        }
    ],
    invalid: [
        {
            code: "0b111110111 === 503;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: "GJS does not support binary literals. Use parseInt('111110111', 2) instead." }]
        },
        {
            code: "0o767 === 503;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: "GJS does not support octal literals. Use parseInt('767', 8) instead." }]
        },
        {
            code: "0x1F7 === 503;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: "GJS does not support hexadecimal literals. Use parseInt('1F7', 16) instead." }]
        },
    ]
});