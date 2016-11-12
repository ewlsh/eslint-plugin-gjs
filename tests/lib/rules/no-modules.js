/**
 * @fileoverview Tests for no-modules rule.
 * @author Evan Welsh
 */

'use strict';

const ERROR_MESSAGE = 'ES6 module syntax is not supported in GJS. Use the imports object instead.';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-modules');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('no-modules', rule, {
    valid: [
        { code: 'const Imported = imports.Imported;', parserOptions: { ecmaVersion: 6 } }
    ],
    // Examples taken from eslint/tests/lib/rules/no-duplicate-imports.js
    invalid: [
        { code: 'import os from "os";\nimport fs from "fs";', parserOptions: { sourceType: 'module' }, errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }] },
        { code: 'import { merge } from "lodash-es";', parserOptions: { sourceType: 'module' }, errors: [{ message: ERROR_MESSAGE }] },
        { code: 'import _, { merge } from "lodash-es";', parserOptions: { sourceType: 'module' }, errors: [{ message: ERROR_MESSAGE }] },
        { code: 'import * as Foobar from "async";', parserOptions: { sourceType: 'module' }, errors: [{ message: ERROR_MESSAGE }] },
        { code: 'import "foo"', parserOptions: { sourceType: 'module' }, errors: [{ message: ERROR_MESSAGE }] },
        { code: 'import os from "os";\nexport { something } from "os";', parserOptions: { sourceType: 'module' }, errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }] },
        {
            code: 'import os from "os";\nexport { hello } from "hello";',
            parserOptions: { sourceType: 'module' },
            
            errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }]
        },
        {
            code: 'import os from "os";\nexport * from "hello";',
            parserOptions: { sourceType: 'module' },
            
            errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }]
        },
        {
            code: 'import os from "os";\nexport { hello as hi } from "hello";',
            parserOptions: { sourceType: 'module' },
            
            errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }]
        },
        {
            code: 'import os from "os";\nexport default function(){};',
            parserOptions: { sourceType: 'module' },
            
            errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }]
        },
        {
            code: 'import { merge } from "lodash-es";\nexport { merge as lodashMerge }',
            parserOptions: { sourceType: 'module' },
            
            errors: [{ message: ERROR_MESSAGE }, { message: ERROR_MESSAGE }]
        }
    ]
});