import {trimTextAroundTag} from '.';

describe('#trimTextAroundTag', () => {
  it('should export trimTextAroundTag', () => {
    expect(trimTextAroundTag).toBeInstanceOf(Function);
  });

  it('should return text as it is when not so many chars aruond highlight', () => {
    const text = ' <em>strongest</em>  cyclone in the Arabian Sea.';

    expect(trimTextAroundTag({text})).toEqual(text);
  });

  it('should truncate text to ~200 chars around highlight (sample 1)', () => {
    const text = [
      `The storm was rapidly intensifying at the time, after the wind shear `,
      `had decreased,[2] and the eye contracted to a diameter of 19 km (12 mi).`,
      `[10] At 09:00 UTC on October 28, the IMD upgraded Nilofar further to an `,
      `extremely severe cyclonic storm.[2][nb 1] Six hours later, the JTWC `,
      `estimated peak 1-minute winds of 215 km/h (130 mph);[5] at the time, the `,
      `agency anticipated further strengthening due to the favorable conditions and good `,
      `organization.[12] At 18:00 UTC on October 28, the IMD estimated peak 3-minute winds of `,
      `205 km/h (125 mph).[2] At the time, it was the <em>third</em>-<em>strongest</em> storm on `,
      `record in the Arabian Sea.[13] On October 29, Nilofar started weakening due to increased wind `,
      `shear, and the convection diminished in intensity.[14] At the same time, the storm turned `,
      `northeastward while rounding the ridge to the east.[15] Increasingly cooler and drier air, `,
      `as well as cooler waters, caused the storm to degrade rapidly.[2] The eye, previously small `,
      `and well defined, dissipated by 06:00 UTC on October 29.[16] Lateras well as cooler waters, `,
      `caused the storm to degrade rapidly.[2] The eye, previously small and well defined, dissipated by 06:00 UTC on October 29.[16] Later`
    ].join('');
    const result = trimTextAroundTag({text});

    expect(result).toEqual(
      [
        `further strengthening due to the favorable conditions and good organization.`,
        `[12] At 18:00 UTC on October 28, the IMD estimated peak 3-minute winds of 205 km/h (125 mph).`,
        `[2] At the time, it was the <em>third</em>-<em>strongest</em> storm on record in the Arabian `,
        `Sea.[13] On October 29, Nilofar started weakening due to increased wind shear, and the convection `,
        `diminished in intensity.[14] At the same time, the storm turned`
      ].join('')
    );
  });

  it('should truncate text to ~200 chars around highlight (sample 2)', () => {
    // lots of text between 2 highlights
    const text = [
      `Extremely Severe Cyclonic Storm Nilofar Extremely severe cyclonic storm (IMD scale) `,
      `Category 4 (Saffir–Simpson scale) Nilofar shortly before peak intensity on October 28, `,
      `2014 Formed October 25, 2014 Dissipated October 31, 2014 Highest winds 3-minute sustained: `,
      `205 km/h (125 mph) 1-minute sustained: 215 km/h (130 mph) Lowest pressure 950 hPa (mbar); `,
      `28.05 inHg Fatalities 4 total Damage Minimal Areas affected Oman, India, Pakistan Part of `,
      `the 2014 North Indian Ocean cyclone season Cyclone Nilofar Extremely Severe Cyclonic Storm `,
      `Nilofar was, at the time, the <em>third</em>- <em>strongest</em> cyclone in the Arabian Sea. `,
      `In late October 2014, it reached peak maximum sustained winds estimated between 205 km/h `,
      `(125 mph) and 215 km/h (130 mph). The India Meteorological Department (IMD) named it Nilofar; `,
      `the name refers to the water lily, and was suggested by Pakistan.[1] The western fringes of `,
      `the storm caused flash flooding in northeastern Oman, killing four people.Category 4 `,
      `(Saffir–Simpson scale) Nilofar shortly before peak intensity on October 28, 2014 `,
      `Formed October 25, 2014 Dissipated October 31, 2014 Highest winds 3-minute sustained: `,
      `205 km/h (125 mph) 1-minute sustained: 215 km/h (130 mph) Lowest pressure 950 hPa (mbar); `,
      `28.05 inHg Fatalities 4 total Damage Minimal Areas affected Oman, India, Pakistan Part of `,
      `the 2014 North Indian Ocean cyclone season Cyclone Nilofar Extremely Severe Cyclonic Storm `,
      `Nilofar was, at the time, the <em>third</em>- <em>strongest</em> cyclone in the Arabian Sea. `,
      `In late October 2014, it reached peak maximum sustained winds estimated between 205 km/h `,
      `(125 mph) and 215 km/h (130 mph). The India Meteorological Department (IMD) named it Nilofar; `,
      `the name refers to the water lily, and was suggested by Pakistan.[1] `,
      `The western fringes of the storm caused flash flooding in northeastern Oman, killing four people.`
    ].join('');
    const result = trimTextAroundTag({text});

    expect(result).toEqual(
      `4 total Damage Minimal Areas affected Oman, India, Pakistan Part of the 2014 North Indian Ocean cyclone ` +
        `season Cyclone Nilofar Extremely Severe Cyclonic Storm Nilofar was, at the time, the <em>third</em>- <em>strongest</em>4 total Damage Minimal ` +
        `Areas affected Oman, India, Pakistan Part of the 2014 North Indian Ocean cyclone season Cyclone Nilofar Extremely Severe Cyclonic Storm Nilofar ` +
        `was, at the time, the <em>third</em>- <em>strongest</em> cyclone in the Arabian Sea. In late October 2014, it`
    );
  });

  it('should truncate text around highlight (sample 2) and add omission marks', () => {
    // lots of text between 2 highlights
    const text = [
      `Extremely Severe Cyclonic Storm Nilofar Extremely severe cyclonic storm (IMD scale) `,
      `Category 4 (Saffir–Simpson scale) Nilofar shortly before peak intensity on October 28, `,
      `2014 Formed October 25, 2014 Dissipated October 31, 2014 Highest winds 3-minute sustained: `,
      `205 km/h (125 mph) 1-minute sustained: 215 km/h (130 mph) Lowest pressure 950 hPa (mbar); `,
      `28.05 inHg Fatalities 4 total Damage Minimal Areas affected Oman, India, Pakistan Part of `,
      `the 2014 North Indian Ocean cyclone season Cyclone Nilofar Extremely Severe Cyclonic Storm `,
      `Nilofar was, at the time, the <em>third</em>- <em>strongest</em> cyclone in the Arabian Sea. `,
      `In late October 2014, it reached peak maximum sustained winds estimated between 205 km/h `,
      `(125 mph) and 215 km/h (130 mph). The India Meteorological Department (IMD) named it Nilofar; `,
      `the name refers to the water lily, and was suggested by Pakistan.[1] The western fringes of `,
      `the storm caused flash flooding in northeastern Oman, killing four people.Category 4 `,
      `(Saffir–Simpson scale) Nilofar shortly before peak intensity on October 28, 2014 `,
      `Formed October 25, 2014 Dissipated October 31, 2014 Highest winds 3-minute sustained: `,
      `205 km/h (125 mph) 1-minute sustained: 215 km/h (130 mph) Lowest pressure 950 hPa (mbar); `,
      `28.05 inHg Fatalities 4 total Damage Minimal Areas affected Oman, India, Pakistan Part of `,
      `the 2014 North Indian Ocean cyclone season Cyclone Nilofar Extremely Severe Cyclonic Storm `,
      `Nilofar was, at the time, the <em>third</em>- <em>strongest</em> cyclone in the Arabian Sea. `,
      `In late October 2014, it reached peak maximum sustained winds estimated between 205 km/h `,
      `(125 mph) and 215 km/h (130 mph). The India Meteorological Department (IMD) named it Nilofar; `,
      `the name refers to the water lily, and was suggested by Pakistan.[1] `,
      `The western fringes of the storm caused flash flooding in northeastern Oman, killing four people.`
    ].join('');
    const result = trimTextAroundTag({text, omission: '...'});

    expect(result).toEqual(
      `...4 total Damage Minimal Areas affected Oman, India, Pakistan Part of the 2014 North Indian Ocean cyclone season ` +
        `Cyclone Nilofar Extremely Severe Cyclonic Storm Nilofar was, at the time, the <em>third</em>- <em>strongest</em>...4 ` +
        `total Damage Minimal Areas affected Oman, India, Pakistan Part of the 2014 North Indian Ocean cyclone season Cyclone Nilofar ` +
        `Extremely Severe Cyclonic Storm Nilofar was, at the time, the <em>third</em>- <em>strongest</em> cyclone in the Arabian Sea. In ` +
        `late October 201...`
    );
  });

  it('should truncate text to ~50 chars around highlight', () => {
    const text = [
      `The storm was rapidly intensifying at the time, after the wind shear `,
      `had decreased,[2] and the eye contracted to a diameter of 19 km (12 mi).`,
      `[10] At 09:00 UTC on October 28, the IMD upgraded Nilofar further to an `,
      `extremely severe cyclonic storm.[2][nb 1] Six hours later, the JTWC `,
      `estimated peak 1-minute winds of 215 km/h (130 mph);[5] at the time, the `,
      `agency anticipated further strengthening due to the favorable conditions and good `,
      `organization.[12] At 18:00 UTC on October 28, the IMD estimated peak 3-minute winds of `,
      `205 km/h (125 mph).[2] At the time, it was the <em>third</em>-<em>strongest</em> storm on `,
      `record in the Arabian Sea.[13] On October 29, Nilofar started weakening due to increased wind `,
      `shear, and the convection diminished in intensity.[14] At the same time, the storm turned `,
      `northeastward while rounding the ridge to the east.[15] Increasingly cooler and drier air, `,
      `as well as cooler waters, caused the storm to degrade rapidly.[2] The eye, previously small `,
      `and well defined, dissipated by 06:00 UTC on October 29.[16] Lateras well as cooler waters, `,
      `caused the storm to degrade rapidly.[2] The eye, previously small and well defined, dissipated by 06:00 UTC on October 29.[16] Later`
    ].join('');
    const result = trimTextAroundTag({text, maxLengthAround: 50});

    expect(result).toEqual(
      `205 km/h (125 mph).[2] At the time, it was the <em>third</em>-<em>strongest</em> storm on record in the Arabian Sea.[13] On`
    );
  });

  it('should not truncate text which has no highlights', () => {
    const text = `The storm was rapidly intensifying at the time, after the wind shear`;
    const result = trimTextAroundTag({text, maxLengthAround: 50});

    expect(result).toEqual(text);
  });

  it('should not truncate text with very long words', () => {
    const text = [
      `asdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsadds`,
      `fasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjag`,
      `dkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfas`,
      `dfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsf`,
      `asdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasd`,
      `fasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagds`,
      `kjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsf asdasdasdfasdfsadF asdasda`,
      `sdfasdfsadF asd fsa Df asdf asd Fa SD test search <em>term</em> to highlight 1 asdasdfasdfasdf. sagdfdfgth `,
      `asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF `,
      `asdasdasdfasdfsadF djfg gf dfghdfg h fdg hgf h dfg h test search <em>term</em> to highlight 2. asd as df sadf sa dg sad g sadg test search <em>term</em> to highlight 3 asdf Asd fsa DFa DSf sad..`
    ].join('');
    const result = trimTextAroundTag({text, maxLengthAround: 80, omission: ' ... '});

    expect(result).toEqual(
      `... asdasdasdfasdfsadF asdasdasdfasdfsadF asd fsa Df asdf asd Fa SD test search <em>term</em> ... asdasdasdfasdfsadF djfg gf dfghdfg h fdg hgf h dfg h test search <em>term</em> to highlight 2. asd as df sadf sa dg sad g sadg test search <em>term</em> to highlight 3 asdf Asd fsa DFa DSf sad..`
    );
  });

  it('should not truncate text which has only highlights', () => {
    const text = `<em>hello</em>`;
    const result = trimTextAroundTag({text, maxLengthAround: 10});

    expect(result).toEqual(text);
  });

  it('should truncate text w/o spaces', () => {
    const text = `${'a'.repeat(500)}oi<em>hello</em>td${'a'.repeat(500)}`;
    const result = trimTextAroundTag({text, maxLengthAround: 4, omission: '...'});

    expect(result).toEqual(`...aaoi<em>hell...</em>tdaa...`);
  });

  it('should truncate text w/ almost no spaces', () => {
    const text = `asdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsfasdasdasdfasdfsadFsaddsfasdfasdfasdfasdfasdfasdfasdfjagdkjfagdskjfdsf asdasdasdfasdfsadF asdasdasdfasdfsadF asd fsa Df asdf asd Fa SD test search <em>term</em> to highlight 1 asdasdfasdfasdf. sagdfdfgth asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF asdasdasdfasdfsadF djfg gf dfghdfg h fdg hgf h dfg h test search &lt;em&gt;<em>term</em>&lt;/em&gt; to highlight 2. asd as df sadf sa dg sad g sadg test search &lt;em&gt;<em>term</em>&lt;/em&gt; to highlight 3 asdf Asd fsa DFa DSf sad..`;
    const result = trimTextAroundTag({text, maxLengthAround: 80, omission: ' ... '});

    expect(result).toEqual(
      `... asdasdasdfasdfsadF asdasdasdfasdfsadF asd fsa Df asdf asd Fa SD test ` +
        `search <em>term</em> ... asdasdasdfasdfsadF djfg gf dfghdfg h fdg hgf h dfg ` +
        `h test search &lt;em&gt;<em>term</em> ... to highlight 2. asd as df sadf sa dg ` +
        `sad g sadg test search &lt;em&gt;<em>term</em>&lt;/em&gt; to highlight 3 asdf Asd fsa DFa DSf sad..`
    );
  });

  it('should aggressively trim text when maxTotalLength is small', () => {
    const text = `foo bar foo bar foo bar foo bar <em>hello</em> foo bar `;
    const result = trimTextAroundTag({text, maxTotalLength: 10});

    expect(result).toEqual(`foo bar fo`);
  });
});
