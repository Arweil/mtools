import { MobXProviderContext, observer } from 'malganis/mobx-react';
import React, { useContext } from 'react';

function DemoA(): JSX.Element {
  return (
    <div>
      This is DemoA Page
    </div>
  );
}

export default observer(() => {
  const context = useContext(MobXProviderContext);

  console.log(context);

  return (
    <DemoA />
  );
});
