/**
 * title: 基础用法
 * description: 新增拓展属性的基础用法
 */

import React, { useState, useCallback } from 'react';
import TableExtFrontEnd from './TableExtFrontEnd';
import TableExtBackEnd from './TableExtBackEnd';
import {
  ConfigProviderExt,
  Form,
  Switch,
  Divider,
  Radio,
  Row,
  Col,
  locale,
  InputNumber,
} from '@m-tools/antd-ext';
import type { RadioChangeEvent } from 'antd/es/radio';

/**
 * Case：
 * 1. 前端分页（一次性加载数据，前端分页）
 * 2. 后端分页
 * 3. 列隐藏
 * 4. useSkeleton：骨架屏，第一屏展示骨架，后面使用Spin组件的loading样式，需要配合loading属性使用
 * 5. tdTooltip：单元格省略信息时，tooltip的配置
 * 6. emptyDesc：空数据文案
 * 7. 分页逻辑：总条数超过10条，显示分页器，不超过10条隐藏分页器，pagination为 false 不启用分页
 *  exp: 总条数11条，显示分页器，页尺寸调整为20，依旧显示分页器
 * 8. UI：
 *  1. 列固定左右滑动
 *  2. 分页器
 *  3. 每个单元格最多展示两行数据，多的数据使用省略号替代，hover展示全部信息
 */
export default function App() {
  const [hidden, setHidden] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [fixedNameLeft, setFixedNameLeft] = useState(false);
  const [fixedOPRight, setFixedOPRight] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [rowSelection, setRowSelection] = useState(false);
  const [radioVal, setRadioVal] = useState('TableExtBackEnd');
  const [loadWithNoData, setLoadWithNoData] = useState(false);
  const [noLoading, setNoLoading] = useState(false);
  const [cellEllipsisRows, setCellEllipsisRows] = useState<number>(1);

  const onChangeRadio = useCallback((e: RadioChangeEvent) => {
    setRadioVal(e.target.value);
  }, []);

  return (
    <ConfigProviderExt locale={locale.zh_CN} prefixCls="antdext">
      <Form layout="inline">
        <Form.Item label="隐藏操作列">
          <Switch checked={hidden} onChange={() => setHidden(!hidden)} />
        </Form.Item>
        <Form.Item label="横向滚动">
          <Switch checked={scroll} onChange={() => setScroll(!scroll)} />
        </Form.Item>
        <Form.Item label="固定姓名列">
          <Switch checked={fixedNameLeft} onChange={() => setFixedNameLeft(!fixedNameLeft)} />
        </Form.Item>
        <Form.Item label="固定操作列">
          <Switch checked={fixedOPRight} onChange={() => setFixedOPRight(!fixedOPRight)} />
        </Form.Item>
        <Form.Item label="表格为空文案切换（表格为空）">
          <Switch checked={empty} onChange={() => setEmpty(!empty)} />
        </Form.Item>
        <Form.Item label="展示列选择">
          <Switch checked={rowSelection} onChange={() => setRowSelection(!rowSelection)} />
        </Form.Item>
        <Form.Item label="首次请求没有数据">
          <Switch checked={loadWithNoData} onChange={() => setLoadWithNoData(!loadWithNoData)} />
        </Form.Item>
        <Form.Item label="No Loading">
          <Switch checked={noLoading} onChange={() => setNoLoading(!noLoading)} />
        </Form.Item>
        <Form.Item label="CellEllipsisRows">
          <InputNumber onChange={(value: number) => setCellEllipsisRows(value)} />
        </Form.Item>
      </Form>

      <Divider />

      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: 'TableExtBackEnd', value: 'TableExtBackEnd' },
          { label: 'TableExtFrontEnd', value: 'TableExtFrontEnd' },
        ]}
        onChange={onChangeRadio}
        value={radioVal}
      />

      <Divider />

      {radioVal === 'TableExtFrontEnd' ? (
        <Row gutter={24}>
          <Col span={12}>
            <TableExtFrontEnd
              hidden={hidden}
              scroll={scroll}
              fixedNameLeft={fixedNameLeft}
              fixedOPRight={fixedOPRight}
              empty={empty}
              theme="hermes"
              rowSelection={rowSelection}
              loadWithNoData={loadWithNoData}
              noLoading={noLoading}
              cellEllipsisRows={cellEllipsisRows}
            />
          </Col>
          <Col span={12}>
            <TableExtFrontEnd
              hidden={hidden}
              scroll={scroll}
              fixedNameLeft={fixedNameLeft}
              fixedOPRight={fixedOPRight}
              empty={empty}
              theme="default"
              rowSelection={rowSelection}
              loadWithNoData={loadWithNoData}
              noLoading={noLoading}
              cellEllipsisRows={cellEllipsisRows}
            />
          </Col>
        </Row>
      ) : radioVal === 'TableExtBackEnd' ? (
        <Row gutter={24}>
          <Col span={12}>
            <TableExtBackEnd
              hidden={hidden}
              scroll={scroll}
              fixedNameLeft={fixedNameLeft}
              fixedOPRight={fixedOPRight}
              empty={empty}
              theme="hermes"
              rowSelection={rowSelection}
              loadWithNoData={loadWithNoData}
              noLoading={noLoading}
              cellEllipsisRows={cellEllipsisRows}
            />
          </Col>
          <Col span={12}>
            <TableExtBackEnd
              hidden={hidden}
              scroll={scroll}
              fixedNameLeft={fixedNameLeft}
              fixedOPRight={fixedOPRight}
              empty={empty}
              theme="default"
              rowSelection={rowSelection}
              loadWithNoData={loadWithNoData}
              noLoading={noLoading}
              cellEllipsisRows={cellEllipsisRows}
            />
          </Col>
        </Row>
      ) : null}
    </ConfigProviderExt>
  );
}
