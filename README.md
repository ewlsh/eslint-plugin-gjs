# eslint-plugin-gjs

Adds compatibility for the GJS environment.

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

Add `gjs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "gjs"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "gjs/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





