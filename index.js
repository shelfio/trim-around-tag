const EM_OPEN_TAG = '<em>';
const EM_CLOSE_TAG = '</em>';

module.exports.trimTextAroundTag = function({text = '', maxLengthAround = 200}) {
  if (isTextTooSmallToTrim(text, maxLengthAround)) {
    return text;
  }

  if (isTextWithoutHighlights(text)) {
    return text;
  }

  if (isTextAroundHighlightsSmallEnough({text, maxLengthAround})) {
    return text;
  }

  const textBeforeHighlight = getTextBeforeHighlight(text);
  const textAfterHighlight = getTextAfterHighlight(text);

  return [
    trimTextUntilSize(textBeforeHighlight, maxLengthAround),
    getTextBetweenHighlightBoundaries(text),
    trimTextUntilSizeFromEnd(textAfterHighlight, maxLengthAround)
  ].join('');
};

function isTextTooSmallToTrim(text, maxLengthAround) {
  return text.length <= maxLengthAround;
}

function isTextWithoutHighlights(text) {
  const firstHighlightStartIndex = text.indexOf(EM_OPEN_TAG);

  return firstHighlightStartIndex === -1;
}

function getTextBeforeHighlight(text) {
  const firstHighlightStartIndex = text.indexOf(EM_OPEN_TAG);

  return text.slice(0, firstHighlightStartIndex);
}

function getTextAfterHighlight(text) {
  const lastHighlightEndIndex = text.lastIndexOf(EM_CLOSE_TAG) + EM_CLOSE_TAG.length;

  return text.slice(lastHighlightEndIndex, text.length);
}

function isTextAroundHighlightsSmallEnough({text, maxLengthAround}) {
  const textBeforeHighlight = getTextBeforeHighlight(text);
  const textAfterHighlight = getTextAfterHighlight(text);
  const isTextBeforeSmallEnough = textBeforeHighlight.length <= maxLengthAround;
  const isTextAfterSmallEnough = textAfterHighlight.length <= maxLengthAround;

  return isTextBeforeSmallEnough && isTextAfterSmallEnough;
}

function getTextBetweenHighlightBoundaries(text) {
  const firstHighlightStartIndex = text.indexOf(EM_OPEN_TAG);
  const lastHighlightEndIndex = text.lastIndexOf(EM_CLOSE_TAG) + EM_CLOSE_TAG.length;

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
