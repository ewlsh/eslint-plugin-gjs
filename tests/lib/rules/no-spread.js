/**
 * @fileoverview Tests for no-spread rule.
 * @author Evan Welsh
 */

'use strict';

const ERROR_MESSAGE = 'The spread operator is not supported in GJS.';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-spread');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('no-spread', rule, {
    valid: [
        {
            // TODO: This is a horrible validity test...
            code: 'obj.foo.apply(obj, [1, 2, 3])',
            parserOptions: { ecmaVersion: 6 },
        },
    ],
    invalid: [
        {
            code: 'obj.foo.apply(obj, ...args)',
            parserOptions: {ecmaVersion: 6},
            errors: [{ message: ERROR_MESSAGE }]
        }
    ]
});