import { Button, Input } from '@m-tools/antd-ext';
import { observer } from 'malganis/mobx-react';
import { RouteComponentProps } from 'malganis/router';
import React from 'react';

function Demo(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <div>
      Demo
      <Input />
      <Button onClick={onClick}>show context</Button>
    </div>
  );
}

export default observer((props: RouteComponentProps) => {
  console.log(props);

  return <Demo onClick={() => console.log('SingleStore')} />;
});
