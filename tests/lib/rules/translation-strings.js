/**
 * @fileoverview Tests for translation-strings rule.
 * @author Evan Welsh
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/translation-strings');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('translation-strings', rule, {
    valid: [
        {
            code: '_("Hello!")',
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: '\'Hello!\'',
            parserOptions: { ecmaVersion: 6 },
        },
    ],
    invalid: [
        {
            code: '_(\'Hello!\')',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: 'Single quotes cannot be used for translation strings.'}]
        },
        {
            code: '"Hello!"',
            parserOptions: { ecmaVersion: 6 },
            errors: [{ message: 'Double quotes are reserved for translation strings.' }]
        }
    ]
});