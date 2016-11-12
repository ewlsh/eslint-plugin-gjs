/**
 * @fileoverview Tests for no-template-strings rule.
 * @author Evan Welsh
 */

'use strict';

const ERROR_MESSAGE = 'GJS does not support template strings.';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-template-strings');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('no-template-strings', rule, {
    valid: [
        {
            code: '{ foo }',
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: '"`${ foo } ${ bar }`"',
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: '\'`${ foo } ${ bar }`\'',
            parserOptions: { ecmaVersion: 6 }
        },
    ],
    invalid: [
        { code: '`${foo} ${bar}`', parserOptions: { ecmaVersion: 6 }, errors: [{ message: ERROR_MESSAGE },{ message: ERROR_MESSAGE },{ message: ERROR_MESSAGE }] },
        { code: '`${foo} ${bar} ${\n baz\n}`', parserOptions: { ecmaVersion: 6 }, errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }] },
        { code: 'tag`${foo} ${bar}`', parserOptions: { ecmaVersion: 6 }, errors: [{ message: ERROR_MESSAGE },{ message: ERROR_MESSAGE },{ message: ERROR_MESSAGE }] },
        { code: 'tag`${foo} ${bar} ${\n  baz\n}`', parserOptions: { ecmaVersion: 6 }, errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }] },
    ]
});
