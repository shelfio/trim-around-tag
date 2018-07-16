module.exports.trimTextAroundTag = function({text = '', maxLengthAround = 200, tag = 'em'}) {
  const OPEN_TAG = `<${tag}>`;
  const CLOSE_TAG = `</${tag}>`;

  if (isTextTooSmallToTrim(text, maxLengthAround)) {
    return text;
  }

  if (isTextWithoutHighlights({text, OPEN_TAG})) {
    return text;
  }

  if (isTextAroundHighlightsSmallEnough({text, maxLengthAround, OPEN_TAG, CLOSE_TAG})) {
    return text;
  }

  const textBeforeHighlight = getTextBeforeHighlight({text, OPEN_TAG});
  const textAfterHighlight = getTextAfterHighlight({text, CLOSE_TAG});

  return [
    trimTextUntilSize(textBeforeHighlight, maxLengthAround),
    getTextBetweenHighlightBoundaries({text, OPEN_TAG, CLOSE_TAG}),
    trimTextUntilSizeFromEnd(textAfterHighlight, maxLengthAround)
  ].join('');
};

function isTextTooSmallToTrim(text, maxLengthAround) {
  return text.length <= maxLengthAround;
}

function isTextWithoutHighlights({text, OPEN_TAG}) {
  const firstHighlightStartIndex = text.indexOf(OPEN_TAG);

  return firstHighlightStartIndex === -1;
}

function getTextBeforeHighlight({text, OPEN_TAG}) {
  const firstHighlightStartIndex = text.indexOf(OPEN_TAG);

  return text.slice(0, firstHighlightStartIndex);
}

function getTextAfterHighlight({text, CLOSE_TAG}) {
  const lastHighlightEndIndex = text.lastIndexOf(CLOSE_TAG) + CLOSE_TAG.length;

  return text.slice(lastHighlightEndIndex, text.length);
}

function isTextAroundHighlightsSmallEnough({text, maxLengthAround, OPEN_TAG, CLOSE_TAG}) {
  const textBeforeHighlight = getTextBeforeHighlight({text, OPEN_TAG});
  const textAfterHighlight = getTextAfterHighlight({text, CLOSE_TAG});
  const isTextBeforeSmallEnough = textBeforeHighlight.length <= maxLengthAround;
  const isTextAfterSmallEnough = textAfterHighlight.length <= maxLengthAround;

  return isTextBeforeSmallEnough && isTextAfterSmallEnough;
}

function getTextBetweenHighlightBoundaries({text, OPEN_TAG, CLOSE_TAG}) {
  const firstHighlightStartIndex = text.indexOf(OPEN_TAG);
  const lastHighlightEndIndex = text.lastIndexOf(CLOSE_TAG) + CLOSE_TAG.length;

  return text.slice(firstHighlightStartIndex, lastHighlightEndIndex);
}

function trimTextUntilSize(text, maxLengthAround) {
  const wordsInput = text.split(' ').reverse();
  const wordsOutput = getWordsUntilLength(wordsInput, maxLengthAround);

  return wordsOutput.reverse().join(' ');
}

function trimTextUntilSizeFromEnd(text, maxLengthAround) {
  const wordsInput = text.split(' ');
  const wordsOutput = getWordsUntilLength(wordsInput, maxLengthAround);

  return wordsOutput.join(' ');
}

function getWordsUntilLength(words, maxLength) {
  const wordsOutput = [];
  let outputLength = 0;

  for (let word of words) {
    const isTextStillShort = outputLength <= maxLength;

    if (isTextStillShort) {
      wordsOutput.push(word);
      outputLength += word.length + 1;
    }
  }

  return wordsOutput;
}
