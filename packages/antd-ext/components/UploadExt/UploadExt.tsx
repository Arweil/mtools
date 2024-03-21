import { CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Flex, Progress, Upload } from 'antd'; // 修改Button为想要导入的组件
import classNames from 'classnames';
import React from 'react';
import ButtonExt from '../ButtonExt/ButtonExt';
import { usePrefixCls } from '../utils';
import other from './img/other.svg';
import pdf from './img/pdf.svg';
import word from './img/word.svg';

const { Dragger } = Upload;
export type UploadExtProps = UploadProps;

function getType(name: string) {
  return (
    (/\.(jpg|jpeg|png|gif|webp)$/i.test(name) && 'image') ||
    (/\.(doc|docx)$/i.test(name) && 'word') ||
    (/\.(pdf)$/i.test(name) && 'pdf') ||
    undefined
  );
}

const mapping = {
  image: (file: UploadFile) => {
    let src = '';
    if (file.url) {
      src = file.url;
    } else if (file.originFileObj) {
      src = URL.createObjectURL(file.originFileObj);
    }
    const dom = (
      <img
        src={src}
        onLoad={$syntheticBaseEvent => {
          URL.revokeObjectURL(src);
        }}
      />
    );
    return dom;
  },
  pdf: () => <img src={pdf} />,
  word: () => <img src={word} />,
};

export default function UploadExt(props: UploadExtProps) {
  const { mtPrefixCls } = usePrefixCls();

  const { children, className, listType, itemRender, maxCount, ...restProps } = props;
  // listType不传值时默认使用自定义改造的picture-card
  const isCustomPictureCard = !listType;
  const internalListType = listType || 'picture-card';
  const uploadClassName = classNames(
    className,
    isCustomPictureCard ? `${mtPrefixCls}-upload-picture-card-wrapper` : '',
  );

  const UploadBtn = (
    <button className={`${mtPrefixCls}-upload-btn`}>
      <UploadOutlined />
      上传文件
    </button>
  );

  const getSpecificFileType = (file: UploadFile) => {
    let fileType = file?.type || file?.originFileObj?.type;
    if (!fileType) {
      fileType = getType(file.name);
    }
    return Object.keys(mapping).find(type => fileType?.includes(type));
  };

  const getFileIcon = (file: UploadFile) => {
    if (!file) return;
    const renderIcon = mapping[getSpecificFileType(file)] || (() => <img src={other} />);
    return <div className={`${mtPrefixCls}-upload-file-icon`}>{renderIcon(file)}</div>;
  };

  return (
    <Upload
      className={uploadClassName}
      maxCount={maxCount}
      itemRender={(originNode, file, fileList, actions) => {
        if (typeof itemRender === 'function') {
          return itemRender(originNode, file, fileList, actions);
        }
        if (!isCustomPictureCard) {
          return originNode;
        }
        const { status, percent } = file;
        const { remove } = actions;
        return (
          <Flex
            className={classNames(`${mtPrefixCls}-upload-list-item`, `status-${status}`)}
            justify="space-between"
            align="center"
          >
            {status === 'uploading' && (
              <Flex vertical justify="center" align="center" flex={1}>
                上传中
                <Progress type="line" percent={percent} size={[88, 2]} showInfo={false} />
              </Flex>
            )}
            {(status === 'done' || status === 'error') && (
              <>
                <Flex align="center" className={`${mtPrefixCls}-upload-list-item-file`}>
                  {getFileIcon(file)}
                  <span title={file.name} className={`${mtPrefixCls}-upload-file-title`}>
                    {file.name}
                  </span>
                </Flex>
                <CloseOutlined className={`${mtPrefixCls}-upload-close-btn`} onClick={remove} />
              </>
            )}
          </Flex>
        );
      }}
      listType={internalListType}
      {...restProps}
    >
      {children ||
        (restProps.fileList?.length >= maxCount
          ? null
          : (isCustomPictureCard && UploadBtn) ||
            (['picture-card', 'picture-circle'].includes(listType) && <PlusOutlined />) || (
              <ButtonExt>上传</ButtonExt>
            ))}
    </Upload>
  );
}

UploadExt.Dragger = Dragger;
