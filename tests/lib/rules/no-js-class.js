/**
 * @fileoverview Tests for no-js-class rule.
 * @author Evan Welsh
 */

"use strict";

const ERROR_MESSAGE = "Javascript classes are not supported in GJS. Use Lang.Class instead.";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-js-class"),
     RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-js-class", rule, {
    valid: [
        {
            code: "const Hi = new Lang.Class({ Name: Hi });",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "const Hello = new Lang.Class({ Name: Hi });",
            parserOptions: { ecmaVersion: 6 },
        }
    ],
    invalid: [
        { 
            code: "class Hi {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: ERROR_MESSAGE }]
        },
        { 
             code: "class Hello {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: ERROR_MESSAGE }]
        }
    ]
});