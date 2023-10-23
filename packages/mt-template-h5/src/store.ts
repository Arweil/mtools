import { createContext } from 'react';

export type TypeGlobalContext = {};

const GlobalContext = createContext<TypeGlobalContext>({});

export default GlobalContext;
