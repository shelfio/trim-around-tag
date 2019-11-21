import {
  isTextTooSmallToTrim,
  isTextWithoutHighlights,
  trimTextUntilSize,
  trimTextUntilSizeFromEnd
} from './helpers';

interface TrimTextAroundTagParams {
  text?: string;
  maxLengthAround?: number;
  maxTotalLength?: number;
  tag?: string;
  omission?: string;
}

export function trimTextAroundTag({
  text = '',
  maxLengthAround = 200,
  maxTotalLength = 500,
  tag = 'em',
  omission = ''
}: TrimTextAroundTagParams): string {
  const OPEN_TAG = `<${tag}>`;

  if (isTextTooSmallToTrim(text, maxTotalLength)) {
    return text;
  }

  if (isTextWithoutHighlights(text, OPEN_TAG)) {
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
}
