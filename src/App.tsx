import { Outlet } from "react-router";
import "./App.css";
import { loader } from "@monaco-editor/react";
import { Suspense, useEffect, useState } from "react";
import TasksWorker from "./utils/tasks?worker";

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { pyrightProvider } from "./utils/python";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

function App() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    loader.config({ monaco });
    loader.init().then((monaco) => {
      pyrightProvider
        .init(monaco as any)
        .catch(console.error)
        .then(() => {
          console.log("loaded");
        });
    });
  }, []);

  console.log("rendered.");
  if (!loaded)
    return (
      <p className="animate-pulse m-auto">Инициализация pyright сервера...</p>
    );

  return <Outlet></Outlet>;
}

export default App;
