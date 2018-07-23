# trim-around-tag [![CircleCI](https://circleci.com/gh/shelfio/trim-around-tag/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/trim-around-tag/tree/master) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg) [![npm (scoped)](https://img.shields.io/npm/v/@shelf/trim-around-tag.svg)](https://www.npmjs.com/package/@shelf/trim-around-tag)

> Trims text to max length around custom HTML tag

## Install

```
$ yarn add @shelf/trim-around-tag
```

## Usage

```js
const {trimAroundTag} = require('@shelf/strim-around-tag');

trimAroundTag({
  // Long text to trim around HTML tag
  // There is <em> text somewhere inside
  text:
    'The storm was rapidly intensifying at the time, after the wind shear had decreased,[2] and the eye contracted to a diameter of 19 km (12 mi).[10] At 09:00 UTC on October 28, the IMD upgraded Nilofar further to an extremely severe cyclonic storm.[2][nb 1] Six hours later, the JTWC estimated peak 1-minute winds of 215 km/h (130 mph);[5] at the time, the agency anticipated further strengthening due to the favorable conditions and good organization.[12] At 18:00 UTC on October 28, the IMD estimated peak 3-minute winds of 205 km/h (125 mph).[2] At the time, it was the <em>third</em>-<em>strongest</em> storm on record in the Arabian Sea.[13] On October 29, Nilofar started weakening due to increased wind shear, and the convection diminished in intensity.[14] At the same time, the storm turned northeastward while rounding the ridge to the east.[15] Increasingly cooler and drier air, as well as cooler waters, caused the storm to degrade rapidly.[2] The eye, previously small and well defined, dissipated by 06:00 UTC on October 29.[16] Lateras well as cooler waters, caused the storm to degrade rapidly.[2] The eye, previously small and well defined, dissipated by 06:00 UTC on October 29.[16] Later',
  // Max length of chars to leave around HTML tag
  maxLengthAround: 200,
  // HTML tag to trim text around
  tag: 'em',
  //(Optional) add '...' from cut side
  omission: '...'
});
//=> anticipated further strengthening due to the favorable conditions and good organization.[12] At 18:00 UTC on October 28, the IMD estimated peak 3-minute winds of 205 km/h (125 mph).[2] At the time, it was the <em>third</em>-<em>strongest</em> storm on record in the Arabian Sea.[13] On October 29, Nilofar started weakening due to increased wind shear, and the convection diminished in intensity.[14] At the same time, the storm turned northeastward
```

<details>
<summary>It transforms this text:</summary>

The storm was rapidly intensifying at the time, after the wind shear had decreased,[2] and the eye contracted to a diameter of 19 km (12 mi).[10] At 09:00 UTC on October 28, the IMD upgraded Nilofar further to an extremely severe cyclonic storm.[2][nb 1] Six hours later, the JTWC estimated peak 1-minute winds of 215 km/h (130 mph);[5] at the time, the agency anticipated further strengthening due to the favorable conditions and good organization.[12] At 18:00 UTC on October 28, the IMD estimated peak 3-minute winds of 205 km/h (125 mph).[2] At the time, it was the `<em>third</em>-<em>strongest</em>` storm on record in the Arabian Sea.[13] On October 29, Nilofar started weakening due to increased wind shear, and the convection diminished in intensity.[14] At the same time, the storm turned northeastward while rounding the ridge to the east.[15] Increasingly cooler and drier air, as well as cooler waters, caused the storm to degrade rapidly.[2] The eye, previously small and well defined, dissipated by 06:00 UTC on October 29.[16] Lateras well as cooler waters, caused the storm to degrade rapidly.[2] The eye, previously small and well defined, dissipated by 06:00 UTC on October 29.[16] Later

</details>

<details>
<summary>Into this:</summary>

...anticipated further strengthening due to the favorable conditions and good organization.[12] At 18:00 UTC on October 28, the IMD estimated peak 3-minute winds of 205 km/h (125 mph).[2] At the time, it was the `<em>third</em>-<em>strongest</em>` storm on record in the Arabian Sea.[13] On October 29, Nilofar started weakening due to increased wind shear, and the convection diminished in intensity.[14] At the same time, the storm turned northeastward...

</details>

### Browsers

Source is built to ES5 syntax using [microbundle](https://github.com/developit/microbundle) and put into `dist/` folder.

## License

MIT © [Shelf](https://shelf.io)
