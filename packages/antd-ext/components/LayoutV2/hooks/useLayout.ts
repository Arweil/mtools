import { useContext } from 'react';
import type { LayoutContextProps } from '../context';
import { LayoutContext } from '../context';

type useLayout = () => Omit<LayoutContextProps, never>;

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
