import { Outlet } from "react-router";
import "./App.css";
import { loader } from "@monaco-editor/react";
import { useEffect } from "react";
import { pyrightProvider } from "./utils/python";
import * as monaco from "monaco-editor";

loader.config({ monaco });

function App() {
  useEffect(() => {
    loader.init().then(async (monaco) => {
      await pyrightProvider.init(monaco as any);
    });
  });

  return <Outlet></Outlet>;
}

export default App;
