import { css } from '@emotion/css';

const wrap = css`
  flex: 1 1 auto;
  overflow: auto;
  margin-right: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const transformLeft = css`
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 30px;
    height: 100%;
    background: linear-gradient(270deg, rgba(27, 45, 85, 0) 0%, #1b2d55 100%);
    content: '';
  }
`;

const transformRight = css`
  position: relative;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 30px;
    height: 100%;
    background: linear-gradient(270deg, #1b2d55 0%, rgba(27, 45, 85, 0) 100%);
    content: '';
  }
`;

const content = css`
  transition: 0.3s;
  display: flex;
  overflow: scrollX;
  width: fit-content;
`;

export default { wrap, transformLeft, transformRight, content };
