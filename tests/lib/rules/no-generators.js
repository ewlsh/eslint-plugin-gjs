/**
 * @fileoverview Tests for no-generators rule.
 * @author Evan Welsh
 */

'use strict';

const ERROR_MESSAGE = 'GJS does not support generator functions.';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-generators');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('no-generators', rule, {
    valid: [
        {
            code: 'function a() { return a + 1; }',
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: 'function b() {}',
            parserOptions: { ecmaVersion: 6 },
        }
    ],
    invalid: [
        { 
            code: 'function* a() { return a + 1; }',
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: ERROR_MESSAGE }]
        },
        { 
            code: 'function* b() {}',
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: ERROR_MESSAGE }]
        }
    ]
});