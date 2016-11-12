/**
 * @fileoverview Tests for no-super rule.
 * @author Evan Welsh
 */

"use strict";

const ERROR_MESSAGE = "The super operator is not supported in GJS.";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-super"),
     RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-super", rule, {
    valid: [
        {
            // TODO: This is a horrible validity test...
            code: "function a() { this.super(); }",
            parserOptions: { ecmaVersion: 6 },
        },
    ],
    invalid: [
        {
            code: "function b() { super(); }",
            parserOptions: {ecmaVersion: 6},
            errors: [{ message: ERROR_MESSAGE }]
        }
    ]
});