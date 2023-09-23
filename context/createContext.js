import {
  createContext as ReactCreateContext,
  useContext as ReactUseContext
} from 'react';

export default function createContext() {
  const context = ReactCreateContext(undefined);
  function useContext() {
    const c = ReactUseContext(context);
    if (c === undefined)
      throw new Error('useContext must be inside a Provider with a value');
    return c;
  }
  return [useContext, context.Provider, context];
}
