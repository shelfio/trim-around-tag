export function isTextTooSmallToTrim(text: string, maxLengthAround: number): boolean {
  return text.length <= maxLengthAround;
}

export function isTextWithoutHighlights(text: string, OPEN_TAG: string): boolean {
  const firstHighlightStartIndex = text.indexOf(OPEN_TAG);

  return firstHighlightStartIndex === -1;
}

export function trimTextUntilSize(text: string, maxLengthAround: number, omission: string): string {
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

export function trimTextUntilSizeFromEnd(
  text: string,
  maxLengthAround: number,
  omission: string
): string {
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

export function getWordsUntilLength(words: string[], maxLength: number): string[] {
  const wordsOutput = [];
  let outputLength = 0;

  for (const word of words) {
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
