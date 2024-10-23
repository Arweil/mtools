import { useContext } from 'react';
import { LayoutContext } from '../context';

function useLayout() {
  const { activeNav, activeMenu, addTab, removeTab, setOpenKey } = useContext(LayoutContext);

  return {
    activeNav,
    activeMenu,
    addTab,
    removeTab,
    setOpenKey,
  };
}

export default useLayout;
