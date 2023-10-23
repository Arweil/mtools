import { MobXProviderContext, observer } from 'malganis/mobx-react';
import React, { useContext } from 'react';

function Demo(): JSX.Element {
  return <div>This is DemoMulStore Page</div>;
}

export default observer(() => {
  const context = useContext(MobXProviderContext);

  console.log(context);

  return <Demo />;
});
