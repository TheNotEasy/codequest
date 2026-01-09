// // import Monaco Language Client components
// import {
//   EditorApp,
//   type EditorAppConfig,
// } from "monaco-languageclient/editorApp";
// import { configureDefaultWorkerFactory } from "monaco-languageclient/workerFactory";
// import {
//   MonacoVscodeApiWrapper,
//   type MonacoVscodeApiConfig,
// } from "monaco-languageclient/vscodeApiWrapper";
// import {
//   LanguageClientWrapper,
//   type LanguageClientConfig,
// } from "monaco-languageclient/lcwrapper";

// import { MonacoEditorReactComp } from "@typefox/monaco-editor-react";

// // VSCode API for file system operations
// import * as vscode from "vscode";
// import { LogLevel } from "@codingame/monaco-vscode-api";
// import {
//   RegisteredFileSystemProvider,
//   RegisteredMemoryFile,
//   registerFileSystemOverlay,
// } from "@codingame/monaco-vscode-files-service-override";

// // import extension for JSON support
// import "@codingame/monaco-vscode-python-default-extension";

// // Sample JSON content
// const jsonContent = `{
//     "$schema": "http://json.schemastore.org/package",
//     "name": "my-package",
//     "version": "1.0.0",
//     "description": "A sample package"
// }`;

// export default function Editor() {
//   // Set up an in-memory file system (won't persist on reload)
//   const fileUri = vscode.Uri.file("/workspace/test.py");
//   const fileSystemProvider = new RegisteredFileSystemProvider(false);
//   fileSystemProvider.registerFile(
//     new RegisteredMemoryFile(fileUri, jsonContent)
//   );
//   registerFileSystemOverlay(1, fileSystemProvider);

//   // Monaco VSCode API configuration
//   const vscodeApiConfig: MonacoVscodeApiConfig = {
//     $type: "extended",
//     viewsConfig: {
//       $type: "EditorService",
//     },
//     logLevel: LogLevel.Debug,
//     userConfiguration: {
//       json: JSON.stringify({
//         "workbench.colorTheme": "Default Dark Modern",
//         "editor.guides.bracketPairsHorizontal": "active",
//         "editor.lightbulb.enabled": "On",
//         "editor.wordBasedSuggestions": "off",
//         "editor.experimental.asyncTokenization": true,
//       }),
//     },
//     monacoWorkerFactory: configureDefaultWorkerFactory,
//   };

//   const languageId = "python";

//   // Language client configuration
//   const languageClientConfig: LanguageClientConfig = {
//     languageId,
//     connection: {
//       options: {
//         $type: "WebSocketUrl",
//         url: "ws://localhost:30000",
//       },
//     },
//     clientOptions: {
//       documentSelector: [languageId],
//       workspaceFolder: {
//         index: 0,
//         name: "workspace",
//         uri: vscode.Uri.file("/workspace"),
//       },
//     },
//   };

//   // editor app / monaco-editor configuration
//   const editorAppConfig: EditorAppConfig = {
//     codeResources: {
//       modified: {
//         text: jsonContent,
//         uri: fileUri.path,
//       },
//     },
//   };

//   return (
//     <MonacoEditorReactComp
//       vscodeApiConfig={vscodeApiConfig}
//       editorAppConfig={editorAppConfig}
//       languageClientConfig={languageClientConfig}
//       style={{ height: "100%" }}
//       onError={(e) => {
//         console.error(e);
//       }}
//     />
//   );
// }
