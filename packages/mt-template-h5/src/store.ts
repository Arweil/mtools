import { createContext } from 'react';

export type TypeGlobalContext = object;

const GlobalContext = createContext<TypeGlobalContext>({});

export default GlobalContext;
