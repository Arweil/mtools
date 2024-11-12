import { css } from '../../utils/emotion';

const paddingTop = 4;

const wrap = css`
  position: relative;
  padding-top: ${paddingTop}px;
  width: 100%;
  height: 100%;
  background-color: #eef4ff;
  font-size: 12px;
  line-height: 18px;
  color: #333333;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  white-space: nowrap;
`;

const leftBtn = css`
  position: absolute;
  bottom: 0;
  left: 0;
  height: calc(100% - ${paddingTop}px);
  width: 28px;
  padding-left: 7px;
  z-index: 1;
  cursor: pointer;
  background: linear-gradient(90deg, #eef4ff 70%, rgba(238, 244, 255, 0) 100%);
`;

const rightBtn = css`
  position: absolute;
  right: 0;
  bottom: 0;
  height: calc(100% - ${paddingTop}px);
  width: 28px;
  padding-right: 7px;
  z-index: 1;
  text-align: right;
  cursor: pointer;
  background: linear-gradient(270deg, #eef4ff 70%, rgba(238, 244, 255, 0) 100%);
`;

const list = css``;

const tab = css`
  position: relative;
  padding: 7px 16px;
  cursor: pointer;
  user-select: none;

  &::after {
    position: absolute;
    top: 50%;
    right: 0;
    display: inline-block;
    width: 1px;
    height: 12px;
    background: #c8ccda;
    transform: translate(100%, -50%);
    content: '';
  }
`;

const selected = css`
  position: relative;
  background: #d6e5ff;
  font-weight: bold;
  font-size: 12px;
  color: #016eff;
  border-radius: 8px 8px 0px 0px;
  z-index: 1;

  &::after,
  &::before {
    position: absolute;
    bottom: 0;
    width: 8px;
    height: 8px;
    content: '';
  }

  &::after {
    right: -8px;
    z-index: 1;
    background: radial-gradient(at 8px 0px, rgba(238, 244, 255, 0) 8px, rgb(214, 229, 255) 8px);
  }

  &::before {
    left: -8px;
    background: radial-gradient(at 0px 0px, rgba(238, 244, 255, 0) 8px, rgb(214, 229, 255) 8px);
  }

  .tab {
    &::after {
      display: none;
    }
  }
`;

const tabNode = css`
  :hover {
    ${selected};
    z-index: 0;
    color: #333333;
    font-weight: unset;
    background: #dfebff;

    &::after {
      right: -8px;
      background: radial-gradient(at 8px 0px, rgba(223, 235, 255, 0) 8px, rgb(223, 235, 255) 8px);
    }

    &::before {
      left: -8px;
      background: radial-gradient(at 0px 0px, rgba(223, 235, 255, 0) 8px, rgb(223, 235, 255) 8px);
    }
  }
`;

const close = css`
  margin-left: 12px;
  font-size: 10px;
`;

export default { wrap, leftBtn, rightBtn, list, tab, tabNode, selected, close };
