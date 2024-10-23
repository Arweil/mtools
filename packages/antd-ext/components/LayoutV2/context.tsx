import React from 'react';

interface LayoutContextProps {
  activeNav: (key: string) => void;
  activeMenu: (key: string) => void;
  addTab: (info: string | { key: string; label: string }) => void;
  removeTab: (key: string) => void;
  setOpenKey: (key: string) => void;
}

export const LayoutContext = React.createContext<LayoutContextProps>({
  activeNav: () => {},
  activeMenu: () => {},
  addTab: () => {},
  removeTab: () => {},
  setOpenKey: () => {},
});
