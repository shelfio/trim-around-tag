module.exports.trimTextAroundTag = function({
  text = '',
  maxLengthAround = 200,
  maxTotalLength = 500,
  tag = 'em',
  omission = ''
}) {
  const OPEN_TAG = `<${tag}>`;

  if (isTextTooSmallToTrim(text, maxTotalLength)) {
    return text;
  }

  if (isTextWithoutHighlights({text, OPEN_TAG})) {
    return text;
  }

  const textParts = text.split(new RegExp(`</?${tag}>`));
  const textTrimmed = textParts
    .map((textPart, i) => {
      const isEvenTextPart = i % 2 === 0;
      const isLastTextPart = i === textParts.length - 1;

      if (isLastTextPart) {
        return trimTextUntilSizeFromEnd(textPart, maxLengthAround, omission);
      }

      if (isEvenTextPart) {
        return `${trimTextUntilSize(textPart, maxLengthAround, omission)}<em>`;
      }

      return `${trimTextUntilSizeFromEnd(textPart, maxLengthAround, omission)}</em>`;
    })
    .join('');

  if (textTrimmed.length > maxTotalLength) {
    return textTrimmed.slice(0, maxTotalLength).trim() + omission;
  }

  return textTrimmed.trim();
};

function isTextTooSmallToTrim(text, maxLengthAround) {
  return text.length <= maxLengthAround;
}

function isTextWithoutHighlights({text, OPEN_TAG}) {
  const firstHighlightStartIndex = text.indexOf(OPEN_TAG);

  return firstHighlightStartIndex === -1;
}

function trimTextUntilSize(text, maxLengthAround, omission) {
  const wordsInput = text.split(' ').reverse();
  const firstWord = wordsInput[0];

  if (firstWord.length > maxLengthAround) {
    const croppedWord = [...firstWord]
      .reverse()
      .slice(0, maxLengthAround)
      .reverse()
      .join('');

    return `${omission}${croppedWord}`;
  }

  const wordsOutput = getWordsUntilLength(wordsInput, maxLengthAround);

  if (wordsInput.length > wordsOutput.length) {
    return `${omission}${wordsOutput.reverse().join(' ')}`;
  }

  return wordsOutput.reverse().join(' ');
}

function trimTextUntilSizeFromEnd(text, maxLengthAround, omission) {
  const wordsInput = text.split(' ');
  const firstWord = wordsInput[0];

  if (firstWord.length > maxLengthAround) {
    const croppedWord = firstWord.slice(0, maxLengthAround);

    return `${croppedWord}${omission}`;
  }

  const wordsOutput = getWordsUntilLength(wordsInput, maxLengthAround);

  if (wordsInput.length > wordsOutput.length) {
    return `${wordsOutput.join(' ')}${omission}`;
  }

  return wordsOutput.join(' ');
}

function getWordsUntilLength(words, maxLength) {
  const wordsOutput = [];
  let outputLength = 0;

  for (let word of words) {
    const willTextBecomeTooLong = outputLength + word.length + 1 > maxLength;

    if (willTextBecomeTooLong) {
      return wordsOutput;
    }

    const isTextStillShort = outputLength <= maxLength;

    if (isTextStillShort) {
      wordsOutput.push(word);
      outputLength += word.length + 1;
    }
  }

  return wordsOutput;
}
