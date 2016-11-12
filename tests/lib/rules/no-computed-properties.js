/**
 * @fileoverview Tests for no-computed-properties rule.
 * @author Evan Welsh
 */

'use strict';

const ERROR_MESSAGE = 'Computed property keys are not supported in GJS.';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-computed-properties');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('no-computed-properties', rule, {
    valid: [
        {
            code: 'let obj_a = { a: 10 }',
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: 'let obj_b = { \'b\': 12 }',
            parserOptions: { ecmaVersion: 6 },
        }
    ],
    invalid: [
        { 
            code: 'let obj_c = { [\'a\']: 12 }',
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: ERROR_MESSAGE }]
        },
        { 
            code: 'let obj_d ={ [\'b\' + 12 ]: 12 }',
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: ERROR_MESSAGE }]
        }
    ]
});