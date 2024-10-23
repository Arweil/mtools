import { useContext } from 'react';
import { LayoutContext } from '../context';

function useLayout() {
  const { activeNav, activeMenu, addTab, setOpenKey } = useContext(LayoutContext);

  return {
    activeNav,
    activeMenu,
    addTab,
    setOpenKey,
  };
}

export default useLayout;
