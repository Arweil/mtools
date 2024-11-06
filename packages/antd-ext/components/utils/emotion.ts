import type { Options } from '@emotion/cache';
import createEmotion from '@emotion/css/create-instance';

export function emotionCss(options: Partial<Options> = {}) {
  return createEmotion({
    key: 'css',
    speedy: false,
    ...options,
  });
}

export const { css, cx } = emotionCss();
