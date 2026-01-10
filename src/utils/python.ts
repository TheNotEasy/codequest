import { MonacoPyrightProvider } from "monaco-pyright-lsp";
import builtinsStubs from "../assets/builtins.pyi?raw";
import workerUrl from "../assets/worker.js?url";

export const pyrightProvider = new MonacoPyrightProvider(workerUrl, {
  typeshed: false,
  typeStubs: {
    "builtins.pyi": builtinsStubs
  },
  features: {
    hover: true,
    completion: true,
    signatureHelp: true,
    diagnostic: true,
    rename: true,
    findDefinition: false
  }
});