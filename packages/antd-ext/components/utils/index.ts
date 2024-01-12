import type { ThemeConfig } from 'antd';
import useMapTheme from './useMapTheme';
import usePrefixCls from './usePrefixCls';
import type { ThemeColor } from '../theme/type';
import { transPlacement2DropdownAlign } from 'antd/es/date-picker/util';
import type { DirectionType } from 'antd/es/config-provider';
import type { SelectCommonPlacement } from 'antd/es/_util/motion';

export function mergeTheme(theme: ThemeConfig, customTheme: ThemeConfig) {
  const { token = {}, components = {}, ...restProps } = customTheme;
  return {
    token: {
      ...theme.token,
      ...token,
    },
    components: Object.keys(theme.components).reduce((pre, cur) => {
      return {
        ...pre,
        [cur]: {
          ...theme.components[cur],
          ...components[cur],
        },
      };
    }, {}),
    ...restProps,
  };
}

export function createHermesTheme(theme: ThemeColor) {
  const {
    colorPrimaryL1,
    colorPrimaryL2,
    colorPrimaryL3,
    colorError,
    colorWarning,
    colorSuccess,
    colorBlackL1,
    colorBlackL2,
    colorBlackL4,
    colorGreyL1,
    colorGreyL3,
    colorGreyL4,
    colorGreyL5,
    colorWhite,
    colorBlackL3,
  } = theme;
  return {
    token: {
      colorPrimary: colorPrimaryL1,
      colorPrimaryHover: colorPrimaryL2,
      colorPrimaryActive: colorPrimaryL3,

      colorError: colorError,
      colorErrorBorderHover: colorError,
      colorWarning: colorWarning,
      colorWarningBorderHover: colorWarning,
      colorSuccess: colorSuccess,
      colorSuccessBorderHover: colorSuccess,

      colorTextDisabled: colorBlackL4,

      colorBgContainerDisabled: colorGreyL3,

      colorBorder: colorGreyL1,
    },
    components: {
      Button: {
        borderRadius: 4,
        colorText: colorBlackL1,
      },
      DatePicker: {
        controlItemBgHover: colorGreyL3,
        colorBgContainerDisabled: colorGreyL5,
        colorText: colorBlackL2,
      },
      Input: {},
      InputNumber: {},
      Select: {
        controlItemBgHover: colorGreyL4,
        controlItemBgActive: colorGreyL4,
        borderRadiusLG: 4,
        borderRadiusSM: 2,
        colorFillSecondary: colorGreyL4,
        colorSplit: colorGreyL4,
      },
      Table: {
        borderRadiusLG: 0,
        controlItemBgActive: colorWhite,
        controlItemBgActiveHover: colorGreyL3,
      },
      Form: {
        itemMarginBottom: 24,
        labelHeight: 30,
        labelColor: colorBlackL3,
      },
    },
  } as ThemeConfig;
}

function transPlacement2DropdownAlign4Outline(
  direction: DirectionType,
  offset: number[],
  placement?: SelectCommonPlacement,
) {
  const d = transPlacement2DropdownAlign(direction, placement);
  d.offset = offset;
  return d;
}

export { useMapTheme, usePrefixCls, transPlacement2DropdownAlign4Outline };
