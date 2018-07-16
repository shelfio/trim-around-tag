# trim-around-tag [![CircleCI](https://img.shields.io/circleci/project/github/vladgolubev/trim-around-tag.svg)](https://circleci.com/gh/vladgolubev/trim-around-tag) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> Trims text to max length around custom HTML tag

## Install

```
$ yarn add trim-around-tag
```

## Usage

```js
const trimAroundTag = require('trim-around-tag');

trimAroundTag('unicorns');
//=> 'unicorns & rainbows'
```

## API

### trimAroundTag(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## License

MIT © [Vlad Holubiev](https://vladholubiev.com)
