import { useState, useCallback } from "react";

export function useOptimistic(initialState) {
  const [state, setState] = useState(initialState);
  const execute = useCallback(async (actionFn, rollbackFn, errorCallback) => {
    actionFn(setState);
    try {
      await actionFn();
    } catch (error) {
      rollbackFn(setState);
      if (errorCallback) errorCallback(error);
    }
  }, []);
  return [state, execute];
}
