import { css } from '../../utils/emotion';

const wrap = css`
  position: relative;
  flex: 1 1 auto;
  overflow: auto;
  margin-right: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const content = css`
  transition: 0.3s;
  display: flex;
  overflow: scrollX;
  width: fit-content;
`;

const leftBtn = css`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 28px;
  padding-left: 7px;
  z-index: 1;
  cursor: pointer;
  background: linear-gradient(90deg, #1b2d55 0%, rgba(27, 45, 85, 0) 100%);
  color: #fff;
  font-size: 10px;
`;

const rightBtn = css`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 28px;
  padding-right: 7px;
  z-index: 1;
  text-align: right;
  cursor: pointer;
  background: linear-gradient(270deg, #1b2d55 0%, rgba(27, 45, 85, 0) 100%);
  color: #fff;
  font-size: 10px;
`;

export default { wrap, content, leftBtn, rightBtn };
