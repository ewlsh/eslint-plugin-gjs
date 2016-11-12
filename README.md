# eslint-plugin-gjs

Adds compatibility for the GJS (Gnome JavaScript) environment.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-gjs`:

```
$ npm install eslint-plugin-gjs --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-gjs` globally.

## Usage

Add `gjs` to the plugins section of your `.eslintrc` configuration file.
Depending on your use case, add either `plugin:gjs/extension` or `plugin:gjs/application` to your extends section.

```json
{
    "plugins": ["gjs"],
    "extends": [ "plugin:gjs/extension" ]
}
```

The plugin automatically imports all relevant rules. If you would like to avoid this, add `gjs/application` or `gjs/shell-extension` to your env section. Then remove `"extends": [ "plugin:gjs/extension" ]`.

```json
{
    "plugins": ["gjs"],
    "env": {
        "es6": true,
        "gjs/application": true
    }
}
```

## Supported Rules

* gjs/no-computed-properties
* gjs/no-generators
* gjs/no-invalid-regexp
* gjs/no-js-class
* gjs/no-modules
* gjs/no-numeric-literals
* gjs/no-spread
* gjs/no-super
* gjs/no-template-strings
* gjs/translation-strings

* DEPRECATED: gjs/no-unsupported-syntax

## Not Implemented
* Lang.Class member formatting
* Object literal formatting (unlikely to be implemented)
* Lang.bind enforcement for closures





