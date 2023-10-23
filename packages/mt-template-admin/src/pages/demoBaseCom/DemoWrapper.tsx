import { observer, MobXProviderContext } from 'malganis/mobx-react';
import React, { useContext, useEffect } from 'react';
import Demo from './Demo';
import { DemoStore as DemoStoreMobx } from './DemoStore';

export default observer(() => {
  const context = useContext(MobXProviderContext);
  console.log(context);
  const { store } = context;
  const { DemoStore } = store as {
    DemoStore: DemoStoreMobx;
  };
  const {
    init,
    initialValues,
    loading,
    count,

    onAdd,
    onReset,
  } = DemoStore;

  useEffect(() => {
    init().catch(() => {});
    return () => {};
  }, []);

  return (
    <Demo
      initialValues={initialValues}
      loading={loading}
      count={count}
      onAdd={onAdd}
      onReset={onReset}
    />
  );
});
