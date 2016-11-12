/**
 * @fileoverview Validate strings passed to the RegExp constructor
 * @author Michael Ficarra
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-invalid-regexp');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

/* eslint-disable quotes */

ruleTester.run("no-invalid-regexp", rule, {
    valid: [
        "RegExp('')",
        "RegExp()",
        "RegExp('.', 'g')",
        "new RegExp('.')",
        "new RegExp",
        "new RegExp('.', 'im')",
        "global.RegExp('\\\\')",
        { code: "new RegExp('.', 'y')", options: [{ allowConstructorFlags: ["y"] }] },
        { code: "new RegExp('.', 'u')", options: [{ allowConstructorFlags: ["U"] }] },
        { code: "new RegExp('.', 'yu')", options: [{ allowConstructorFlags: ["y", "u"] }] },
        { code: "new RegExp('/', 'yu')", options: [{ allowConstructorFlags: ["y", "u"] }] },
        { code: "new RegExp('\\/', 'yu')", options: [{ allowConstructorFlags: ["y", "u"] }] },
    ],
    invalid: [
          { code: "new RegExp('.', 'u')", parserOptions: { ecmaVersion: 6 }, errors: [{ message: "Invalid flags supplied to RegExp constructor 'u'." }] },
        { code: "new RegExp('.', 'y')", parserOptions: { ecmaVersion: 6 }, errors: [{ message: "Invalid flags supplied to RegExp constructor 'y'." }] },
        { code: "new RegExp('/', 'yu')", parserOptions: { ecmaVersion: 6 }, errors: [{ message: "Invalid flags supplied to RegExp constructor 'yu'." }] },
        { code: "new RegExp('\\/', 'yu')", parserOptions: { ecmaVersion: 6 }, errors: [{ message: "Invalid flags supplied to RegExp constructor 'yu'." }] },
        { code: "RegExp('[');", errors: [{ message: "Invalid regular expression: /[/: Unterminated character class." }] },
        { code: "RegExp('.', 'u');", errors: [{ message: "Invalid flags supplied to RegExp constructor 'u'." }] },
        { code: "RegExp('.', 'yu');", errors: [{ message: "Invalid flags supplied to RegExp constructor 'yu'." }] },
        { code: "RegExp('.', 'z');", errors: [{ message: "Invalid flags supplied to RegExp constructor 'z'." }] },
        { code: "new RegExp(')');", errors: [{ message: "Invalid regular expression: /)/: Unmatched ')'.", type: "NewExpression" }] }
    ]
});

/* eslint-enable quotes */