import { Button, Input } from '@m-tools/antd-ext';
import { observer } from 'malganis/mobx-react';
import { RouteComponentProps } from 'malganis/router';
import React from 'react';

function Demo(props: { onClick: () => void }): React.JSX.Element {
  const { onClick } = props;

  return (
    <div>
      This is DemoMulStore Page
      <Input />
      <Button onClick={onClick}>show context</Button>
    </div>
  );
}

export default observer((props: RouteComponentProps) => {
  console.log(props);

  return <Demo onClick={() => console.log('MulStore')} />;
});
