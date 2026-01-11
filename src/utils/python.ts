import { MonacoPyrightProvider } from "monaco-pyright-lsp";
import workerUrl from "monaco-pyright-lsp/dist/worker.js?url";
import builtinsStubs from "../assets/builtins.pyi?raw";
import typeshedZip from "../assets/typeshed-fallback.zip?arraybuffer";
import { invoke } from "@tauri-apps/api/core";

export const pyrightProvider = new MonacoPyrightProvider(workerUrl, {
  typeshed: typeshedZip,
  features: {
    hover: true,
    completion: true,
    signatureHelp: true,
    diagnostic: true,
    rename: true,
    findDefinition: false,
  },
});

export function runPythonCode(code: string): Promise<[string, string, string]> {
  return invoke("run_python_code", { code });
}
