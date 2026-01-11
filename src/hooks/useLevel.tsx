import React, { JSX, useEffect } from "react";
import type { LevelState as PythonVariablesState } from "../assets/levels/python.variables/component";

export type LevelId = "python.variables";

interface LevelStates {
  "python.variables": PythonVariablesState;
}

export interface Level<State> {
  Component: (props: { state: State }) => JSX.Element;
  newState: () => State;
  injectChecker: (state: State, code: string) => string;
  check: (state: State, chkbuf: string) => boolean;
}

const promiseCache: Map<string, Promise<Level<any>>> = new Map();

export function getLevel(
  levelId: LevelId
): Promise<Level<LevelStates[typeof levelId]>> {
  if (promiseCache.has(levelId)) return promiseCache.get(levelId)!;
  const promise = (async () => {
    switch (levelId) {
      case "python.variables":
        return await import("../assets/levels/python.variables/component");
    }
  })();
  promiseCache.set(levelId, promise);
  return promise;
}

export function useLevel(
  levelId: LevelId
): Level<LevelStates[typeof levelId]> | null {
  const [level, setLevel] = React.useState<Level<
    LevelStates[typeof levelId]
  > | null>(null);
  React.useEffect(() => {
    setLevel(null);
    getLevel(levelId).then(setLevel);
  }, [levelId]);

  return level;
}
