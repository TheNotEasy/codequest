import { load } from "js-toml";
import { LevelId } from "./useLevel";

export interface ModuleManifest {
  name: string;
  dependencies: string[];
  levels: LevelId[];
}

const promiseCache: Map<string, Promise<ModuleManifest>> = new Map();

// this allows hmr and vite optimizations
async function getRawModule(id: string): Promise<string> {
  switch (id) {
    case "python":
      return (await import("../assets/modules/python.toml?raw")).default;
    default:
      throw Error(`module "${id}" not found`);
  }
}

export function loadModule(id: string): Promise<ModuleManifest> {
  if (promiseCache.has(id)) return promiseCache.get(id)!;

  const modulePromise = async () => {
    return load(await getRawModule(id)) as ModuleManifest;
  };
  const promise = modulePromise();
  promiseCache.set(id, promise);
  return promise;
}
